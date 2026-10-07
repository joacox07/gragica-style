#!/usr/bin/env node
/**
 * Verifica que los tokens de marca (brand/tokens/*.tokens.json, formato DTCG)
 * sigan siendo un espejo fiel de lo que el producto usa de verdad:
 * packages/ui/src/styles/tokens.css y packages/ui/src/lib/palette.ts.
 *
 * Sólo lee. No escribe ningún archivo.
 *
 *   node scripts/brand/check-tokens.mjs [--product <repo gragica>]   deriva + contraste (exit 1 si algo falla)
 *   node scripts/brand/check-tokens.mjs --table                      además imprime la tabla de color en Markdown
 *
 * El producto vive en otro repo (github.com/valentinogrande/gragica). Ruta: --product, o la variable
 * GRAGICA_REPO, o ../gragica al lado de este repo. Sin el repo del producto, sólo valida contraste.
 *
 * Sin dependencias: Node ≥ 18.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const read = (p) => readFileSync(resolve(ROOT, p), "utf8");
const argProduct = process.argv.indexOf("--product");
const PRODUCT = resolve(argProduct >= 0 ? process.argv[argProduct + 1] : process.env.GRAGICA_REPO ?? resolve(ROOT, "../gragica"));
const HAS_PRODUCT = existsSync(resolve(PRODUCT, "packages/ui/src/styles/tokens.css"));
const readProduct = (p) => readFileSync(resolve(PRODUCT, p), "utf8");
const BRAND_HUE = 116; // sin colegio: el verde de Gragica
const TOLERANCE = 2; // por canal 0-255: absorbe redondeos de HSL → sRGB

// ---------- color math ----------
const hexToRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const rgbToHex = (rgb) => "#" + rgb.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("").toUpperCase();
function hslToRgb(h, s, l) {
  s /= 100; l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0), f(8), f(4)].map((v) => Math.round(v * 255));
}
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const luminance = (rgb) => { const [r, g, b] = rgb.map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
export const contrast = (a, b) => { const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
function oklch(rgb) {
  const [r, g, b] = rgb.map(lin);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  const C = Math.hypot(A, B);
  const H = ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360;
  return `oklch(${(L * 100).toFixed(1)}% ${C.toFixed(3)} ${C < 0.002 ? 0 : H.toFixed(0)})`;
}
function cmykApprox(rgb) {
  const [r, g, b] = rgb.map((v) => v / 255);
  const k = 1 - Math.max(r, g, b);
  if (k >= 1) return "0/0/0/100";
  return [(1 - r - k) / (1 - k), (1 - g - k) / (1 - k), (1 - b - k) / (1 - k), k].map((v) => Math.round(v * 100)).join("/");
}

/** Parsea hsl()/rgb()/#hex a [r,g,b] (ignora alfa). */
function parseColor(str) {
  str = str.trim();
  let m;
  if ((m = str.match(/^#([0-9a-f]{6})$/i))) return hexToRgb(str);
  if ((m = str.match(/^hsla?\(\s*([\d.]+)(?:deg)?[\s,]+([\d.]+)%[\s,]+([\d.]+)%/i))) return hslToRgb(+m[1], +m[2], +m[3]);
  if ((m = str.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i))) return [+m[1], +m[2], +m[3]];
  return null;
}

// ---------- tokens.css: valor efectivo por modo ----------
function cssBuckets(css) {
  css = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const light = new Map(), dark = new Map();
  const re = /([^{}]+)\{([^{}]*)\}/g; // bloques hoja (los @media quedan fuera: tienen llaves anidadas)
  let m;
  // Quitar los @media {...} completos antes, para no leer reduced-motion ni breakpoints.
  css = css.replace(/@media[^{]*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g, "");
  while ((m = re.exec(css))) {
    const sel = m[1].trim().split("\n").pop().trim();
    const target = /^\.dark$/.test(sel) ? dark : /^(@theme|:root|:root:where\(:not\(\.dark\)\))$/.test(sel) ? light : null;
    if (!target) continue;
    for (const d of m[2].split(";")) {
      const i = d.indexOf(":");
      if (i < 0) continue;
      const k = d.slice(0, i).trim(), v = d.slice(i + 1).trim();
      if (k.startsWith("--")) target.set(k, v);
    }
  }
  return { light, dark };
}
function resolveVar(value, scope, depth = 0) {
  if (depth > 10) return value;
  return value.replace(/var\(\s*(--[\w-]+)\s*(?:,\s*((?:[^()]|\([^()]*\))*))?\)/g, (_, name, fb) => {
    if (name === "--brand-hue") return String(BRAND_HUE);
    if (/^--brand-[ld]-/.test(name)) return resolveVar(fb ?? "", scope, depth + 1); // las pone el colegio en runtime
    const v = scope.get(name);
    return resolveVar(v ?? fb ?? "", scope, depth + 1);
  });
}
function cssValue(buckets, name, mode) {
  const scope = mode === "dark" ? new Map([...buckets.light, ...buckets.dark]) : buckets.light;
  const raw = scope.get(name);
  if (raw == null) return null;
  let v = resolveVar(raw, scope);
  // `hsl(116 45% 30%)` o una tripleta cruda `116 45% 30%`
  if (/^[\d.]+\s+[\d.]+%\s+[\d.]+%/.test(v)) v = `hsl(${v})`;
  return { raw, rgb: parseColor(v) };
}

// ---------- palette.ts ----------
function tsValue(ts, path) {
  const [name, key] = path.split(".");
  const start = ts.indexOf(`export const ${name} =`);
  if (start < 0) return null;
  const body = ts.slice(start, ts.indexOf("as const", start));
  if (/^\d+$/.test(key)) {
    const all = [...body.matchAll(/"([^"]+)"/g)].map((x) => x[1]);
    return all[+key] ?? null;
  }
  const m = body.match(new RegExp(`\\b${key}:\\s*"([^"]+)"`));
  return m ? m[1] : null;
}

// ---------- tokens JSON ----------
function flatten(node, path = [], type, out = new Map()) {
  if (node && typeof node === "object" && "$value" in node) {
    out.set(path.join("."), { ...node, $type: node.$type ?? type });
    return out;
  }
  for (const [k, v] of Object.entries(node ?? {})) {
    if (k.startsWith("$")) continue;
    flatten(v, [...path, k], node.$type ?? type, out);
  }
  return out;
}
const prim = flatten(JSON.parse(read("brand/tokens/primitive.tokens.json")));
const sem = flatten(JSON.parse(read("brand/tokens/semantic.tokens.json")));
const all = new Map([...prim, ...sem]);
function resolveToken(path, seen = new Set()) {
  const t = all.get(path);
  if (!t) throw new Error(`token inexistente: ${path}`);
  if (typeof t.$value === "string" && /^\{.+\}$/.test(t.$value)) {
    const ref = t.$value.slice(1, -1);
    if (seen.has(ref)) throw new Error(`referencia circular: ${path}`);
    return resolveToken(ref, new Set([...seen, path]));
  }
  return t;
}
const rgbOf = (path) => hexToRgb(resolveToken(path).$value.hex);

// ---------- 1. deriva ----------
const css = HAS_PRODUCT ? readProduct("packages/ui/src/styles/tokens.css") : "";
const ts = HAS_PRODUCT ? readProduct("packages/ui/src/lib/palette.ts") : "";
if (!HAS_PRODUCT) console.warn(`⚠ No encontré el repo del producto en ${PRODUCT}: salteo la deriva (usá --product <ruta>).`);
const buckets = cssBuckets(css);
const problems = [];
let checked = 0;
for (const [path, t] of all) {
  if (t.$type !== "color" || typeof t.$value !== "object") continue;
  const { hex, colorSpace, components } = t.$value;
  // coherencia interna: hex == components
  const fromComp = colorSpace === "hsl" ? hslToRgb(...components) : components.map((v) => v * 255);
  if (fromComp.some((v, i) => Math.abs(v - hexToRgb(hex)[i]) > TOLERANCE))
    problems.push(`${path}: hex ${hex} no coincide con components [${components}]`);
  const src = t.$extensions?.["com.gragica.source"];
  if (!src || !HAS_PRODUCT) continue;
  let actual = null, where = "";
  if (src.css) { const r = cssValue(buckets, src.css, src.mode ?? "light"); actual = r?.rgb; where = `tokens.css ${src.css} (${src.mode ?? "light"}) = ${r?.raw}`; }
  else if (src.ts) { const v = tsValue(ts, src.ts); actual = v && parseColor(v); where = `palette.ts ${src.ts} = ${v}`; }
  else continue;
  checked++;
  if (!actual) { problems.push(`${path}: no encontré ${where}`); continue; }
  const want = hexToRgb(hex);
  if (actual.some((v, i) => Math.abs(v - want[i]) > TOLERANCE))
    problems.push(`${path}: JSON ${hex} ≠ código ${rgbToHex(actual)}  ← ${where}`);
}
// dimensiones y motion con fuente CSS
for (const [path, t] of all) {
  const src = t.$extensions?.["com.gragica.source"];
  if (!src?.css || t.$type === "color" || !HAS_PRODUCT) continue;
  const raw = buckets.light.get(src.css);
  checked++;
  if (raw == null) { problems.push(`${path}: no existe ${src.css} en tokens.css`); continue; }
  const v = t.$value;
  const want = Array.isArray(v) ? `cubic-bezier(${v.join(", ")})` : typeof v === "object" ? `${v.value}${v.unit}` : String(v);
  if (raw.replace(/\s+/g, "") !== want.replace(/\s+/g, "")) problems.push(`${path}: JSON ${want} ≠ tokens.css ${src.css} = ${raw}`);
}

// ---------- 2. contraste de los pares documentados ----------
// [texto, fondo, mínimo, uso]
const PAIRS = [
  ["color.text.primary", "color.surface.page", 4.5, "texto principal"],
  ["color.text.secondary", "color.surface.page", 4.5, "bajadas"],
  ["color.text.muted", "color.surface.raised", 4.5, "pies y captions"],
  ["color.brand.primary", "color.surface.page", 4.5, "remate / eyebrow / links en verde"],
  ["color.brand.on-primary", "color.brand.primary", 4.5, "botón primario"],
  ["color.brand.on-night", "color.brand.night", 4.5, "texto sobre banda oscura"],
  ["color.brand.accent-on-night", "color.brand.night", 4.5, "dorado sobre banda oscura"],
  ["color.dark.primary", "color.brand.night", 4.5, "remate verde sobre banda oscura"],
  ["color.gold.700", "color.gold.100", 4.5, "insignia dorada"],
  ["color.status.success-text", "color.surface.raised", 4.5, "aprobado como texto"],
  ["color.status.warning-text", "color.surface.raised", 4.5, "en riesgo como texto"],
  ["color.status.error-text", "color.surface.raised", 4.5, "desaprobado como texto"],
  ["color.ai.text", "color.surface.raised", 4.5, "texto de IA"],
  ["color.dark.text", "color.dark.page", 4.5, "texto en oscuro"],
  ["color.dark.primary", "color.dark.page", 4.5, "verde en oscuro"],
  ["color.gold.700", "color.surface.page", 4.5, "dorado como texto o ícono sobre claro"],
];
// Pares que NO se usan: se imprimen para que la regla tenga su número.
const FORBIDDEN = [
  ["color.brand.primary", "color.brand.night", "verde Gragica sobre verde noche → usar color.dark.primary"],
  ["color.brand.accent", "color.surface.page", "dorado 500 sobre papel → sólo decorativo; texto/ícono con gold.700"],
  ["color.gragi.neon", "color.surface.page", "verde neón de Gragi como texto → nunca"],
  ["color.status.warning", "color.surface.raised", "ámbar de relleno como texto → usar status.warning-text"],
];
const rows = [];
for (const [fg, bg, min, use] of PAIRS) {
  const r = contrast(rgbOf(fg), rgbOf(bg));
  rows.push({ fg, bg, r, min, use });
  if (r < min) problems.push(`contraste ${fg} sobre ${bg}: ${r.toFixed(2)}:1 < ${min}:1 (${use})`);
}

// ---------- salida ----------
console.log(`Tokens de color/dimensión verificados contra el código: ${checked}`);
console.log("\nContraste (WCAG 2.x):");
for (const { fg, bg, r, min, use } of rows)
  console.log(`  ${r >= min ? "✓" : "✗"} ${r.toFixed(2).padStart(5)}:1  (mín ${min})  ${fg} sobre ${bg} — ${use}`);

console.log("\nPares prohibidos (referencia):");
for (const [fg, bg, why] of FORBIDDEN) console.log(`  ⊘ ${contrast(rgbOf(fg), rgbOf(bg)).toFixed(2).padStart(5)}:1  ${fg} sobre ${bg} — ${why}`);

if (process.argv.includes("--table")) {
  console.log("\n| Token | HEX | RGB | HSL | OKLCH | CMYK aprox. | Uso |\n|---|---|---|---|---|---|---|");
  for (const [path, t] of prim) {
    if (t.$type !== "color") continue;
    const { hex, colorSpace, components } = t.$value;
    const rgb = hexToRgb(hex);
    const hslTxt = colorSpace === "hsl" ? `hsl(${components[0]} ${components[1]}% ${components[2]}%)` : "—";
    console.log(`| \`${path.replace(/^color\./, "")}\` | \`${hex}\` | ${rgb.join(", ")} | ${hslTxt} | ${oklch(rgb)} | ${cmykApprox(rgb)} | ${t.$description} |`);
  }
}

if (problems.length) {
  console.error(`\n✗ ${problems.length} problema(s):`);
  for (const p of problems) console.error("  - " + p);
  process.exit(1);
}
console.log(HAS_PRODUCT ? "\n✓ Sin deriva: los tokens de marca coinciden con el código y los pares documentados pasan contraste." : "\n✓ Contraste OK. Deriva NO verificada (falta el repo del producto).");
