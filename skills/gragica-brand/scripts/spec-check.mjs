#!/usr/bin/env node
/**
 * Valida references/brand-spec.json contra el sistema de marca (brand/tokens, logos, plantillas).
 * Sólo lee. Exit 1 si hay errores.
 *
 *   node skills/gragica-brand/scripts/spec-check.mjs
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { collectRefs, contrast, findBrandRoot, hexToRgb, loadSpec, loadTokens, tokenValue } from "./lib.mjs";

const root = findBrandRoot();
const spec = loadSpec();
const tokens = loadTokens(root);
const errors = [], warnings = [];
const err = (m) => errors.push(m), warn = (m) => warnings.push(m);

// 1. Toda referencia {token} existe
const refs = collectRefs(spec);
for (const { ref, at } of refs) if (!tokens.resolveToken(ref)) err(`referencia inexistente {${ref}} en ${at}`);

// 2. Pares de contraste
const rgb = (ref) => hexToRgb(tokenValue(tokens, ref.slice(1, -1)));
for (const p of spec.color.pairs.allowed) {
  const r = contrast(rgb(p.fg), rgb(p.bg));
  if (r < p.min) err(`par permitido ${p.fg} / ${p.bg} da ${r.toFixed(2)}:1 < ${p.min}`);
}
for (const p of spec.color.pairs.forbidden) {
  const r = contrast(rgb(p.fg), rgb(p.bg));
  if (r >= 4.5) warn(`par prohibido ${p.fg} / ${p.bg} da ${r.toFixed(2)}:1 (≥ 4,5): revisar si la prohibición sigue teniendo sentido`);
}

// 3. Colores legados no deben coincidir con ningún token vigente
const tokenHex = new Set([...tokens.all.values()].filter((t) => t.$type === "color" && t.$value?.hex).map((t) => t.$value.hex.toUpperCase()));
for (const h of spec.color.legacyNeverUse) if (tokenHex.has(h.toUpperCase())) err(`color legado ${h} figura como token vigente`);

// 4. Niveles: proporciones suman 100
for (const [k, lv] of Object.entries(spec.levels)) {
  for (const key of ["colorShare", "colorShareNight"]) {
    const cs = lv[key];
    if (cs && typeof cs === "object") {
      const sum = Object.values(cs).reduce((a, b) => a + b, 0);
      if (sum !== 100) err(`levels.${k}.${key} suma ${sum}, no 100`);
    }
  }
}

// 5. Formatos coherentes
const minLogo = spec.logo.minimum;
for (const [name, f] of Object.entries(spec.formats)) {
  if (f.margin.x * 2 >= f.width) err(`formats.${name}: márgenes laterales (${f.margin.x}×2) ≥ ancho`);
  if (f.margin.top + f.margin.bottom >= f.height) err(`formats.${name}: márgenes verticales ≥ alto`);
  for (const s of ["top", "bottom", "x"]) if (f.safe[s] < f.margin[s] - 0 && f.safe[s] > f.margin[s]) err(`formats.${name}: safe.${s} incoherente`);
  for (const [role, v] of Object.entries(f.type ?? {})) {
    if (Array.isArray(v) && v[0] > v[1]) err(`formats.${name}.type.${role}: mínimo > máximo`);
  }
  const ver = f.logo?.version?.replace(/-(white|ink|ink-word)$/, "");
  const lw = f.logo?.widthPx?.[0];
  if (ver && lw && minLogo[ver] && lw < minLogo[ver].px) err(`formats.${name}: logo ${lw}px < mínimo ${minLogo[ver].px}px de ${ver}`);
  if (f.logo?.version && !spec.logo.files[f.logo.version]) err(`formats.${name}: versión de logo desconocida ${f.logo.version}`);
  if (!f.maxWordsHeadline) warn(`formats.${name}: sin maxWordsHeadline`);
}

// 6. Archivos que el spec nombra
for (const [k, p] of Object.entries(spec.logo.files)) if (!existsSync(join(root, p))) err(`logo.files.${k}: no existe ${p}`);
for (const p of [spec.sources.entry, ...spec.sources.tokens]) if (!existsSync(join(root, p))) err(`sources: no existe ${p}`);
for (const p of [spec.sources.render]) if (!existsSync(join(root, p))) warn(`sources.render: todavía no existe ${p} (lo crea el sistema de marca)`);

// 7. Motion y tipografía iguales a los tokens
const dur = (k) => tokenValue(tokens, `duration.${k}`);
for (const [k, ms] of Object.entries(spec.motion.durationsMs)) if (dur(k) !== `${ms}ms`) err(`motion.durationsMs.${k}=${ms} ≠ token duration.${k}=${dur(k)}`);
const ease = tokenValue(tokens, "cubicBezier.standard");
if (`cubic-bezier(${ease.join(", ")})` !== spec.motion.easing) err(`motion.easing ≠ token cubicBezier.standard`);
for (const fam of ["serif", "sans"]) {
  const tok = tokenValue(tokens, `font.family.${fam}`);
  if (tok?.[0] !== spec.type.families[fam].name) err(`type.families.${fam} (${spec.type.families[fam].name}) ≠ token font.family.${fam} (${tok?.[0]})`);
}

// 8. Plantillas declaran un formato del spec
const tdir = join(root, spec.sources.templates);
if (existsSync(tdir)) {
  const html = readdirSync(tdir).filter((f) => f.endsWith(".html"));
  if (!html.length) warn("brand/assets/templates/ todavía no tiene plantillas");
  for (const f of html) {
    const src = readFileSync(join(tdir, f), "utf8");
    const m = src.match(/<script[^>]+id=["']piece["'][^>]*>([\s\S]*?)<\/script>/);
    if (!m) { err(`plantilla ${f}: falta el bloque <script type="application/json" id="piece">`); continue; }
    let piece;
    try { piece = JSON.parse(m[1]); } catch (e) { err(`plantilla ${f}: bloque piece no es JSON válido`); continue; }
    if (!spec.formats[piece.format]) err(`plantilla ${f}: formato "${piece.format}" no existe en el spec`);
  }
}

// 9. Todo hex escrito en la skill (y, como aviso, en brand/**/*.md) existe en la paleta o es un legado listado
{
  const { brandPalette, parseColor, rgbDist } = await import("./lib.mjs");
  const pal = [...brandPalette(tokens, spec).keys(), ...spec.color.legacyNeverUse, "#36C251", "#089A33"].map((h) => parseColor(h));
  const known = (h) => pal.some((p) => rgbDist(p, parseColor(h)) <= 1);
  const scan = (file, level) => {
    const txt = readFileSync(file, "utf8");
    for (const m of txt.matchAll(/#[0-9A-Fa-f]{6}\b/g)) if (!known(m[0])) level(`${file.replace(root + "/", "")}: ${m[0]} no es un color de los tokens`);
  };
  const skillDir = new URL("..", import.meta.url).pathname;
  scan(join(skillDir, "SKILL.md"), err);
  for (const f of readdirSync(join(skillDir, "references")).filter((f) => f.endsWith(".md"))) scan(join(skillDir, "references", f), err);
  const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(d, e.name)) : e.name.endsWith(".md") ? [join(d, e.name)] : []));
  for (const f of walk(join(root, "brand"))) scan(f, warn);
}

console.log(`Sistema de marca: ${root}`);
console.log(`Referencias a tokens verificadas: ${refs.length} · formatos: ${Object.keys(spec.formats).length} · niveles: ${Object.keys(spec.levels).length}`);
for (const w of warnings) console.log(`  ⚠ ${w}`);
if (errors.length) {
  console.error(`\n✗ ${errors.length} error(es):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log("\n✓ brand-spec.json es coherente con los tokens, los logos y las plantillas.");
