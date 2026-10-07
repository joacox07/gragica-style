#!/usr/bin/env node
/**
 * Lint estático de una pieza de Gragica (HTML o SVG) contra references/brand-spec.json.
 * Lee el brief embebido en <script type="application/json" id="piece"> (o <metadata id="piece"> en SVG).
 *
 *   node skills/gragica-brand/scripts/lint-piece.mjs pieza.html [otra.html…] [--json]
 *
 * Exit 1 si alguna pieza tiene errores. Los avisos no bloquean pero hay que mirarlos.
 * Sin dependencias. Es heurístico: no reemplaza mirar el PNG renderizado.
 */
import { readFileSync } from "node:fs";
import { basename } from "node:path";
import { brandPalette, contrast, findBrandRoot, loadSpec, loadTokens, parseColor, rgbDist, rgbToHex, tokenValue } from "./lib.mjs";

const args = process.argv.slice(2);
const asJson = args.includes("--json");
const files = args.filter((a) => !a.startsWith("--"));
if (!files.length) {
  console.error("Uso: lint-piece.mjs <pieza.html|svg> […] [--json]");
  process.exit(2);
}

const root = findBrandRoot();
const spec = loadSpec();
const tokens = loadTokens(root);
const basePalette = brandPalette(tokens, spec);
const tv = (ref) => tokenValue(tokens, ref.replace(/^\{|\}$/g, ""));
const schema = JSON.parse(readFileSync(new URL("../references/piece-brief.schema.json", import.meta.url), "utf8"));
const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function lint(file) {
  const src = readFileSync(file, "utf8");
  const out = [];
  const E = (rule, msg, ref) => out.push({ level: "error", rule, msg, ref });
  const W = (rule, msg, ref) => out.push({ level: "warn", rule, msg, ref });

  // ---------- brief ----------
  const pm = src.match(/<(script|metadata)[^>]*id=["']piece["'][^>]*>([\s\S]*?)<\/\1>/i);
  let piece = {};
  if (!pm) E("brief.missing", 'Falta el brief embebido: <script type="application/json" id="piece">{…}</script>', "references/piece-brief.schema.json");
  else {
    try { piece = JSON.parse(pm[2].replace(/^\s*<!\[CDATA\[|\]\]>\s*$/g, "")); }
    catch { E("brief.json", "El bloque piece no es JSON válido"); }
  }
  // Completar lienzo desde el formato si el brief no lo trae
  if (pm && spec.formats[piece.format] && (piece.width === undefined || piece.height === undefined)) {
    W("brief.size", `El brief no trae width/height: uso ${spec.formats[piece.format].width}×${spec.formats[piece.format].height} del formato`, "references/piece-brief.schema.json");
    piece.width ??= spec.formats[piece.format].width;
    piece.height ??= spec.formats[piece.format].height;
  }
  // Validación mínima contra el schema (required, enum, maxLength, pattern)
  if (pm) {
    const props = schema.properties;
    const hardEnums = new Set(["format", "level", "background", "structure"]);
    for (const [k, def] of Object.entries(props)) {
      const v = piece[k];
      if (v === undefined || v === "") continue;
      if (def.enum && !def.enum.includes(v)) (hardEnums.has(k) ? E : W)("brief.enum", `"${k}": ${JSON.stringify(v)} no es uno de ${def.enum.join(" | ")}`, `piece-brief.schema.json › ${k}`);
      if (def.maxLength && typeof v === "string" && v.length > def.maxLength) W("brief.maxLength", `"${k}" tiene ${v.length} caracteres (máx. ${def.maxLength})`, `piece-brief.schema.json › ${k}`);
      if (def.pattern && typeof v === "string" && !new RegExp(def.pattern).test(v)) E("brief.pattern", `"${k}" no cumple ${def.pattern}`, `piece-brief.schema.json › ${k}`);
    }
    const evType = props.evidence.properties.type.enum;
    if (piece.evidence?.type && !evType.includes(piece.evidence.type)) E("brief.enum", `evidence.type "${piece.evidence.type}" no es uno de ${evType.join(" | ")}`);
  }
  const fmt = spec.formats[piece.format];
  const lvl = spec.levels[String(piece.level)];
  if (pm) {
    for (const k of ["format", "level", "goal", "audience", "headline", "evidence", "background"])
      if (piece[k] === undefined || piece[k] === "") E("brief.required", `Falta "${k}" en el brief`, "references/piece-brief.schema.json");
    if (piece.format && !fmt) E("brief.format", `Formato desconocido "${piece.format}"`, "brand-spec.json › formats");
    if (piece.level && !lvl) E("brief.level", `Nivel desconocido "${piece.level}"`, "brand-spec.json › levels");
    if (fmt && (piece.width !== fmt.width || piece.height !== fmt.height))
      E("canvas.size", `Lienzo ${piece.width}×${piece.height} ≠ ${piece.format} ${fmt.width}×${fmt.height}`, `brand-spec.json › formats.${piece.format}`);
  }

  // ---------- separar CSS, texto visible ----------
  const noScript = src.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<metadata[\s\S]*?<\/metadata>/gi, "");
  const styles = [...noScript.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]).join("\n");
  const inline = [...noScript.matchAll(/\sstyle=["']([^"']*)["']/gi)].map((m) => m[1]).join(";\n");
  const attrs = [...noScript.matchAll(/\s(?:fill|stroke|stop-color|color|bgcolor)=["']([^"']+)["']/gi)].map((m) => m[1]);
  const css = (styles + "\n" + inline).replace(/\/\*[\s\S]*?\*\//g, "").replace(/url\((["']?)data:[^)]*\1\)/gi, "url()");
  const visible = noScript
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, (m) => (/<text/i.test(m) ? m.replace(/<(?!\/?text)[^>]+>/g, " ") : " "))
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&laquo;/g, "«").replace(/&raquo;/g, "»").replace(/&hellip;/g, "…")
    .replace(/\s+/g, " ").trim();
  const allText = [visible, piece.headline, piece.lead, piece.cta, piece.eyebrow].filter(Boolean).join(" \n ");

  // ---------- color ----------
  const palette = new Map(basePalette);
  if (piece.schoolColor) palette.set(piece.schoolColor.toUpperCase(), "schoolColor");
  const tol = spec.color.toleranceRgb;
  const legacy = spec.color.legacyNeverUse.map((h) => [h.toUpperCase(), parseColor(h)]);
  const neon = [tv("{color.gragi.neon}"), tv("{color.gragi.body}")].map(parseColor);
  const colorLits = [...(css + "\n" + attrs.join("\n")).matchAll(/#[0-9a-f]{6}\b|#[0-9a-f]{3}\b|rgba?\([^)]*\)|hsla?\([^)]*\)/gi)].map((m) => m[0]);
  const seenBad = new Set();
  for (const lit of colorLits) {
    const rgb = parseColor(lit);
    if (!rgb) continue;
    const hex = rgbToHex(rgb);
    if (seenBad.has(hex)) continue;
    const inPalette = [...palette.keys()].some((p) => rgbDist(parseColor(p), rgb) <= tol);
    const leg = legacy.find(([, l]) => rgbDist(l, rgb) === 0) ?? (inPalette ? null : legacy.find(([, l]) => rgbDist(l, rgb) <= tol));
    if (leg) { E("color.legacy", `${lit} es un verde/azul legado (${leg[0]}); usá {color.brand.primary} ${tv("{color.brand.primary}")}`, "brand-spec.json › color.legacyNeverUse"); seenBad.add(hex); continue; }
    if (neon.some((n) => rgbDist(n, rgb) <= tol)) { E("color.gragi-neon", `${lit}: el verde de Gragi solo existe dentro del render del robot`, "brand-spec.json › color.exceptions.gragiNeon"); seenBad.add(hex); continue; }
    const alpha = /rgba|hsla|\/\s*[\d.]+\s*\)/i.test(lit);
    const ok = inPalette;
    if (!ok && !(alpha && (rgbDist(rgb, [0, 0, 0]) <= tol || rgbDist(rgb, [255, 255, 255]) <= tol || rgbDist(rgb, [17, 20, 19]) <= tol))) {
      E("color.off-palette", `${lit} no está en la paleta de marca (más cercano: ${nearest(rgb)})`, "brand/visual/COLOR.md · brand/tokens");
      seenBad.add(hex);
    }
  }
  function nearest(rgb) {
    let best = null, d = 1e9;
    for (const [h, p] of palette) { const dd = rgbDist(parseColor(h), rgb); if (dd < d) { d = dd; best = `${h} (${p})`; } }
    return best;
  }
  // dorado: máximo uno
  const goldHexes = ["{color.gold.500}", "{color.gold.300}", "{color.gold.700}"].map(tv).map((h) => h.toLowerCase());
  const goldUses = (css.toLowerCase().match(new RegExp(goldHexes.join("|"), "g")) || []).length + (css.match(/var\(--(?:accent|gold)[^)]*\)/gi) || []).length;
  if (goldUses > 2) W("color.gold-count", `El dorado aparece ${goldUses} veces en el CSS: máximo un acento dorado por pieza`, "brand-spec.json › levels.*.goldMaxPerPiece");

  // ---------- tipografía ----------
  const allowed = spec.type.allowedFamilies.map(norm);
  const famDecls = [...css.matchAll(/font-family\s*:\s*([^;}{]+)/gi)].map((m) => m[1]);
  for (const decl of famDecls) {
    for (const fam of decl.split(",").map((f) => f.trim().replace(/^["']|["']$/g, "")).filter(Boolean)) {
      if (/^var\(/.test(fam)) continue;
      if (!allowed.includes(norm(fam))) E("type.family", `Tipografía no permitida: "${fam}". Solo Source Serif 4 / Source Sans 3`, "brand-spec.json › type.families");
    }
  }
  for (const m of noScript.matchAll(/fonts\.googleapis\.com\/css2?\?([^"']+)/gi)) {
    for (const f of m[1].matchAll(/family=([^:&]+)/g)) {
      const name = decodeURIComponent(f[1].replace(/\+/g, " "));
      if (!["Source Serif 4", "Source Sans 3"].includes(name)) E("type.webfont", `Carga una webfont ajena: ${name}`, "brand-spec.json › type.googleFontsCss");
    }
  }
  const loadsSource = /fonts\.googleapis\.com[^"']*Source\+(Serif|Sans)/i.test(noScript) || /@font-face[^}]*Source (Serif 4|Sans 3)/i.test(styles);
  if (famDecls.some((d) => /Source (Serif|Sans)/i.test(d)) && !loadsSource) W("type.not-loaded", "Usa Source Serif/Sans pero no las carga (@font-face local de assets/fonts o Google Fonts): el render puede caer en Georgia", "brand-spec.json › verify.fonts");
  if (!famDecls.length && !/<svg/i.test(src)) W("type.none", "No declara font-family: va a caer en la fuente del navegador", "brand-spec.json › type.families");
  // serif en controles
  const forbiddenSel = spec.type.serifForbiddenIn;
  for (const m of styles.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const sel = m[1].trim(), body = m[2];
    if (/font-family[^;]*(serif\s*4|georgia|times)/i.test(body) && !/sans/i.test(body.match(/font-family[^;]*/i)?.[0] ?? "")) {
      const tags = sel.split(/[\s,>+~]+/).map((t) => t.replace(/[.#:[].*$/, "").toLowerCase());
      const hit = tags.find((t) => forbiddenSel.includes(t));
      if (hit) E("type.serif-in-control", `Serif en <${hit}> (${sel}): el serif no entra a controles`, "brand-spec.json › type.serifForbiddenIn");
    }
  }
  for (const m of noScript.matchAll(/<(button|input|select|textarea|table|th|td|nav|label)\b[^>]*style=["'][^"']*font-family[^"']*serif\s*4/gi))
    E("type.serif-in-control", `Serif en <${m[1]}> inline`, "brand-spec.json › type.serifForbiddenIn");
  // tamaño del display
  if (fmt?.type?.display) {
    const dm = styles.match(/(?:\.display|h1)[^{]*\{[^}]*font-size\s*:\s*([\d.]+)px/i)
      ?? styles.match(/(?:\.display|h1)[^{]*\{[^}]*\bfont\s*:[^;}]*?\b([\d.]+)px/i);
    if (dm) {
      const px = +dm[1], [lo, hi] = fmt.type.display;
      if (px < lo || px > hi) (piece.level === 4 ? W : E)("type.display-size", `Titular a ${px}px; ${piece.format} pide ${lo}–${hi}px${piece.level === 4 ? " (campaña: permitido si es intencional)" : ""}`, `brand-spec.json › formats.${piece.format}.type.display`);
    } else W("type.display-size", "No encontré font-size en px para .display/h1: verificá la escala a mano", `brand-spec.json › formats.${piece.format}.type`);
  }

  // ---------- efectos ----------
  const forb = new Set(lvl?.effectsForbidden ?? []);
  const effects = {
    gradient: /(linear|radial|conic)-gradient\(/i,
    "backdrop-filter": /backdrop-filter\s*:/i,
    glow: /text-shadow\s*:(?!\s*none)/i,
    "perspective-mockup": /perspective\s*[:(]|rotate[XY]\(|rotate3d\(/i,
    blob: /border-radius\s*:\s*\d+%\s+\d+%\s+\d+%\s+\d+%\s*\/|clip-path\s*:\s*path\(/i,
  };
  for (const [name, re] of Object.entries(effects)) if (forb.has(name) && re.test(css)) E(`effect.${name}`, `Efecto prohibido en nivel ${piece.level}: ${name}`, `brand-spec.json › levels.${piece.level}.effectsForbidden`);
  if (forb.has("large-shadow")) {
    for (const m of css.matchAll(/box-shadow\s*:\s*([^;}{]+)/gi)) {
      const blurs = [...m[1].matchAll(/(-?[\d.]+)px\s+(-?[\d.]+)px\s+([\d.]+)px/g)].map((x) => +x[3]);
      if (blurs.some((b) => b > 8)) { E("effect.large-shadow", `Sombra grande (${m[1].trim()}): máximo 0 1px 2px`, "brand-spec.json › layout.screenshotRule"); break; }
    }
  }

  // ---------- copy ----------
  const emoji = allText.match(/\p{Extended_Pictographic}/gu)?.filter((c) => !"✓⚠→↓↑←·©®".includes(c)) ?? [];
  if (emoji.length) E("copy.emoji", `Emojis: ${[...new Set(emoji)].join(" ")}`, "brand-spec.json › copy.emoji");
  const excl = (visible.match(/[!¡]/g) || []).length;
  if (excl > spec.copy.maxExclamationsPerPiece * 2) E("copy.exclamation", `${excl / 2} exclamaciones: máximo ${spec.copy.maxExclamationsPerPiece}`, "brand-spec.json › copy.maxExclamationsPerPiece");
  if (/\.\.\./.test(visible)) W("copy.ellipsis", 'Usá "…" (un carácter), no "..."', "brand-spec.json › copy.ellipsis");
  const nt = norm(allText);
  for (const w of spec.copy.forbiddenWords) if (nt.includes(norm(w))) E("copy.forbidden-word", `Palabra/frase prohibida: "${w}"`, "brand/verbal/VOICE_AND_TONE.md");
  for (const p of spec.copy.tuteoPatterns) { const m = allText.match(new RegExp(p, "iu")); if (m) E("copy.tuteo", `Tuteo: "${m[0]}" → voseo`, "brand-spec.json › copy.address"); }
  for (const p of spec.copy.ustedPatterns) { const m = allText.match(new RegExp(p, "iu")); if (m) E("copy.usted", `Usted: "${m[0]}" → voseo`, "brand-spec.json › copy.address"); }
  if (/\bGRAGICA\b/.test(visible)) E("copy.brand-name", '"GRAGICA" en mayúsculas: es "Gragica"', "brand/verbal/VOCABULARY.md");
  for (const [use, avoid] of Object.entries(spec.copy.vocabulary)) {
    for (const a of avoid) {
      const word = a.replace(/\s*\(.*\)$/, "");
      if (word === "gragica" || word === "GRAGICA") continue;
      if (new RegExp(`\\b${word}s?\\b`, "i").test(visible)) W("copy.vocabulary", `"${word}" → preferí "${use}"`, "brand/verbal/VOCABULARY.md");
    }
  }
  for (const cta of spec.copy.cta.forbidden) if (nt.includes(norm(cta))) E("copy.cta", `CTA prohibido: "${cta}"`, "brand-spec.json › copy.cta");
  if (piece.cta && piece.cta.split(/\s+/).length > spec.copy.cta.maxWordsAd) E("copy.cta-length", `CTA de ${piece.cta.split(/\s+/).length} palabras (máx. ${spec.copy.cta.maxWordsAd})`, "brand-spec.json › copy.cta");
  if (/\b\d{1,2} De [A-Z]/.test(visible)) E("copy.date-format", 'Fecha en Title Case ("8 De Septiembre"): va en minúscula', "brand/verbal/COPY_GUIDELINES.md");
  if (/[“"][^”"]{2,40}[”"]/.test(visible)) W("copy.quotes", "Comillas inglesas: para citas y etiquetas usá «»", "brand-spec.json › copy.quotes");

  // ---------- bajada ----------
  if (piece.lead) {
    const words = piece.lead.split(/\s+/).filter((w) => /\p{L}|\d/u.test(w)).length;
    const maxL = fmt?.maxWordsLead ?? spec.copy.lead.maxWords;
    if (words > maxL) E("lead.length", `Bajada de ${words} palabras (máx. ${maxL} en ${piece.format})`, `brand-spec.json › formats.${piece.format}.maxWordsLead`);
    const sentences = (piece.lead.match(/[.!?](\s|$)/g) || []).length;
    if (sentences > spec.copy.lead.sentences[1]) E("lead.sentences", `Bajada de ${sentences} frases (máx. ${spec.copy.lead.sentences[1]})`, "brand-spec.json › copy.lead");
  }

  // ---------- titular y remate ----------
  if (piece.headline) {
    const h = piece.headline.trim();
    const words = h.split(/\s+/).length;
    const maxW = fmt?.maxWordsHeadline ?? spec.copy.headline.maxWords;
    if (words > maxW) E("headline.length", `Titular de ${words} palabras (máx. ${maxW} en ${piece.format})`, "brand-spec.json › formats.*.maxWordsHeadline");
    if (!h.endsWith(".")) E("headline.period", "El titular termina con punto", "brand-spec.json › copy.headline.endsWith");
    if (/[!¡…]/.test(h)) E("headline.punct", "Sin exclamación ni puntos suspensivos en el titular", "brand-spec.json › copy.headline");
    if (/\b[A-ZÁÉÍÓÚ][a-záéíóú]+\s+[A-ZÁÉÍÓÚ][a-záéíóú]+\s+[A-ZÁÉÍÓÚ]/.test(h)) W("headline.case", "¿Title Case? Los titulares van en sentence case", "brand-spec.json › copy.case");
    const flat = (s) => s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    if (!flat(visible).includes(flat(h).slice(0, Math.min(20, h.length)))) W("headline.not-found", "El titular del brief no aparece en la pieza", "references/piece-brief.schema.json");
    const needRemate = spec.copy.headline.remateRequiredLevels.includes(piece.level);
    if (needRemate && !piece.remate) E("remate.missing", "Nivel 3–4: el titular necesita remate (brief.remate)", "brand-spec.json › type.remate");
    if (piece.remate) {
      if (!h.endsWith(piece.remate.trim())) E("remate.suffix", `El remate "${piece.remate}" tiene que ser el final exacto del titular`, "brand-spec.json › type.remate");
      const rm = noScript.match(/<[^>]+class=["'][^"']*\bremate\b[^"']*["'][^>]*>([\s\S]*?)<\/[^>]+>/i);
      if (!rm) E("remate.markup", 'Falta el elemento class="remate" que pinta el remate en verde', "brand-spec.json › type.remate.markup");
      else if (!flat(rm[1]).includes(flat(piece.remate).replace(/\.$/, ""))) W("remate.markup", "El elemento .remate no contiene el texto del remate del brief");
      const night = ["night", "green"].includes(piece.background);
      const want = night ? tv("{color.dark.primary}") : tv("{color.brand.primary}");
      const remRule = styles.match(/\.remate[^{]*\{([^}]*)\}/i)?.[1] ?? "";
      const col = remRule.match(/(?:^|;)\s*color\s*:\s*([^;]+)/i)?.[1]?.trim();
      if (col && !col.startsWith("var(")) {
        const rgb = parseColor(col);
        if (rgb && rgbDist(rgb, parseColor(want)) > tol) E("remate.color", `.remate en ${col}; sobre fondo ${piece.background} va ${want}`, "brand-spec.json › type.remate");
      }
    }
  }

  // ---------- logo ----------
  const logoRefs = [...noScript.matchAll(/(?:src|href|data)=["']([^"']*gragica-[a-z-]+\.svg)["']/gi)].map((m) => basename(m[1]));
  const inlineLogo = /<svg[^>]*aria-label=["']Gragica["']/i.test(noScript);
  for (const legacyFile of spec.logo.legacyFilesNeverUse) if (noScript.includes(legacyFile)) E("logo.legacy", `Usa el logo viejo ${legacyFile}`, "brand/visual/LOGO.md");
  if (!logoRefs.length && !inlineLogo && piece.level >= 2 && !/carousel/.test(piece.format ?? "")) E("logo.missing", "La pieza no lleva logo oficial (brand/assets/logos/gragica-*.svg)", "brand/visual/LOGO.md");
  const night = ["night", "green", "school-color"].includes(piece.background);
  for (const f of logoRefs) {
    const white = /white/.test(f);
    if (night && !white && !/app-icon/.test(f)) E("logo.background", `${f} sobre fondo ${piece.background}: va la versión white`, "brand-spec.json › logo.byBackground");
    if (!night && white) E("logo.background", `${f} (blanco) sobre fondo claro`, "brand-spec.json › logo.byBackground");
  }
  const logoRule = styles.match(/\.logo[^{]*\{([^}]*)\}/i)?.[1] ?? "";
  let logoW = +(logoRule.match(/(?:^|;)\s*width\s*:\s*([\d.]+)px/i)?.[1] ?? NaN);
  const logoH = +(logoRule.match(/(?:^|;)\s*height\s*:\s*([\d.]+)px/i)?.[1] ?? NaN);
  if (Number.isNaN(logoW) && !Number.isNaN(logoH)) {
    const isLockupH = logoRefs.some((f) => /lockup-h/.test(f));
    const isMark = logoRefs.some((f) => /mark|app-icon/.test(f));
    if (isLockupH) logoW = logoH * spec.logo.lockupAspect;
    else if (isMark) logoW = logoH;
  }
  if (!Number.isNaN(logoW) && fmt?.logo?.widthPx) {
    const [lo, hi] = fmt.logo.widthPx;
    const onlyMarkAllowed = /mark/.test(fmt.logo.version) && logoRefs.some((f) => /lockup/.test(f));
    if (!onlyMarkAllowed && (logoW < lo - 1 || logoW > hi + 1)) W("logo.size", `Logo a ${Math.round(logoW)}px de ancho; ${piece.format} pide ${lo}–${hi}px`, `brand-spec.json › formats.${piece.format}.logo`);
    const min = spec.logo.minimum[logoRefs.find((f) => /lockup-v/.test(f)) ? "lockup-v" : logoRefs.find((f) => /lockup/.test(f)) ? "lockup-h" : "mark"];
    if (min && logoW < min.px) E("logo.minimum", `Logo a ${Math.round(logoW)}px: por debajo del mínimo (${min.px}px)`, "brand-spec.json › logo.minimum");
  } else if ((logoRefs.length || inlineLogo) && piece.level >= 2) W("logo.size", "No pude leer el ancho del logo (.logo { width|height: Npx }): verificalo en el PNG");

  // ---------- evidencia ----------
  const ev = piece.evidence ?? {};
  if (ev.type === "real-screenshot") {
    if (!ev.asset) E("evidence.asset", "Captura real sin ruta (evidence.asset)", "brand-spec.json › evidence");
    if (!/datos ficticios|captura real/i.test(visible)) E("evidence.caption", 'La captura necesita su pie: "Captura real · datos ficticios"', "brand-spec.json › layout.screenshotCaption");
    if (ev.asset && !src.includes(basename(ev.asset))) W("evidence.asset", `La pieza no referencia ${basename(ev.asset)}`);
  }
  if (ev.type === "sourced-figure" && !ev.source) E("evidence.source", "Cifra sin fuente (evidence.source). Si no hay fuente, no hay cifra: preguntá", "brand-spec.json › evidence.whenMissing");
  if (ev.type === "real-quote" && !(ev.author && ev.source)) E("evidence.quote", "Cita sin autor real o sin permiso (evidence.author / evidence.source)", "brand-spec.json › evidence");
  if (ev.type && !spec.evidence.valid.some((v) => v.type === ev.type)) E("evidence.type", `Tipo de evidencia desconocido: ${ev.type}`);

  // ---------- Gragi ----------
  const hasGragi = /gragi(-head)?\.webp/i.test(noScript);
  if (hasGragi && piece.level === 2) E("gragi.level", "Gragi no aparece en piezas institucionales", "brand-spec.json › gragi.rules");
  if (hasGragi && piece.level === 3 && !/gragi|asistente/i.test(allText)) W("gragi.context", "Gragi en marketing solo si la pieza habla del asistente", "brand-spec.json › gragi.rules");
  if (hasGragi && /alumn|familia/i.test(piece.audience ?? "")) E("gragi.audience", "Gragi es para el personal del colegio: no se promete a alumnos ni familias", "brand-spec.json › gragi.rules");
  if (hasGragi && /filter\s*:|hue-rotate|mix-blend/i.test(css)) E("gragi.recolor", "No se recolorea ni filtra a Gragi", "brand-spec.json › gragi.rules");

  // ---------- safe zone (heurístico: posiciones absolutas en px) ----------
  if (fmt) {
    for (const m of css.matchAll(/(?<![-\w])(top|bottom|left|right)\s*:\s*([\d.]+)px/gi)) {
      const side = m[1].toLowerCase(), v = +m[2];
      const lim = side === "top" ? fmt.safe.top : side === "bottom" ? fmt.safe.bottom : fmt.safe.x;
      if (v > 0 && v < lim) { W("layout.safe-zone", `${side}: ${v}px queda dentro del margen de seguridad (${lim}px en ${piece.format}). OK solo para fondos y filetes`, `brand-spec.json › formats.${piece.format}.safe`); break; }
    }
  }

  // ---------- contraste de pares prohibidos declarados en reglas ----------
  for (const m of styles.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const fg = parseColor(m[2].match(/(?:^|;)\s*color\s*:\s*([^;]+)/i)?.[1] ?? "");
    const bg = parseColor(m[2].match(/background(?:-color)?\s*:\s*(#[0-9a-f]{3,6}|rgb[^;]*|hsl[^;]*)/i)?.[1] ?? "");
    if (fg && bg && contrast(fg, bg) < 4.5) W("color.contrast", `${m[1].trim()}: contraste ${contrast(fg, bg).toFixed(2)}:1 < 4,5 (OK solo si el texto es ≥ 24px)`, "brand/visual/COLOR.md § Accesibilidad");
  }

  return { file, piece: { format: piece.format, level: piece.level }, results: out };
}

const reports = files.map(lint);
let failed = false;
if (asJson) console.log(JSON.stringify(reports, null, 2));
for (const r of reports) {
  const errs = r.results.filter((x) => x.level === "error"), warns = r.results.filter((x) => x.level === "warn");
  if (errs.length) failed = true;
  if (asJson) continue;
  console.log(`\n${errs.length ? "✗" : "✓"} ${r.file}  [${r.piece.format ?? "?"} · nivel ${r.piece.level ?? "?"}]  ${errs.length} error(es), ${warns.length} aviso(s)`);
  for (const x of [...errs, ...warns]) console.log(`  ${x.level === "error" ? "✗" : "⚠"} ${x.rule}: ${x.msg}${x.ref ? `  ← ${x.ref}` : ""}`);
}
process.exit(failed ? 1 : 0);
