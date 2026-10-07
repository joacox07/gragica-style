/**
 * Utilidades compartidas por los scripts de la skill gragica-brand.
 * Node ≥ 18, sin dependencias.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

export const SKILL_DIR = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const isBrandRoot = (d) => existsSync(join(d, "BRAND.md")) && existsSync(join(d, "brand", "tokens", "semantic.tokens.json"));

/**
 * Dónde está el sistema de marca (BRAND.md + brand/). Orden:
 * 1. GRAGICA_ROOT  2. subiendo desde el cwd  3. subiendo desde la skill
 * 4. el checkout principal si estamos en un worktree  5. dentro del bundle zip.
 */
export function findBrandRoot() {
  const tried = [];
  if (process.env.GRAGICA_ROOT) {
    if (isBrandRoot(process.env.GRAGICA_ROOT)) return resolve(process.env.GRAGICA_ROOT);
    tried.push(process.env.GRAGICA_ROOT);
  }
  for (const start of [process.cwd(), SKILL_DIR]) {
    let d = resolve(start);
    while (true) {
      if (isBrandRoot(d)) return d;
      tried.push(d);
      const up = dirname(d);
      if (up === d) break;
      d = up;
    }
  }
  try {
    const out = execSync("git worktree list --porcelain", { cwd: SKILL_DIR, stdio: ["ignore", "pipe", "ignore"] }).toString();
    const main = out.split("\n").find((l) => l.startsWith("worktree "))?.slice(9);
    if (main && isBrandRoot(main)) return main;
  } catch {}
  const bundled = join(SKILL_DIR, "brand-root");
  if (isBrandRoot(bundled)) return bundled;
  throw new Error(
    "No encontré BRAND.md + brand/tokens/. Corré desde el repo de Gragica o definí GRAGICA_ROOT=/ruta/al/repo.",
  );
}

export const readJson = (p) => JSON.parse(readFileSync(p, "utf8"));

// ---------- color ----------
export const hexToRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
export const rgbToHex = (rgb) => "#" + rgb.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("").toUpperCase();
export function hslToRgb(h, s, l) {
  s /= 100; l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0), f(8), f(4)].map((v) => Math.round(v * 255));
}
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
export const luminance = (rgb) => { const [r, g, b] = rgb.map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
export const contrast = (a, b) => { const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
export const rgbDist = (a, b) => Math.max(...a.map((v, i) => Math.abs(v - b[i])));

/** #rgb, #rrggbb, rgb(), hsl() → [r,g,b] | null (ignora alfa). */
export function parseColor(str) {
  str = String(str).trim();
  let m;
  if ((m = str.match(/^#([0-9a-f]{3})$/i))) return m[1].split("").map((c) => parseInt(c + c, 16));
  if ((m = str.match(/^#([0-9a-f]{6})([0-9a-f]{2})?$/i))) return hexToRgb("#" + m[1]);
  if ((m = str.match(/^hsla?\(\s*([\d.]+)(?:deg)?[\s,]+([\d.]+)%[\s,]+([\d.]+)%/i))) return hslToRgb(+m[1], +m[2], +m[3]);
  if ((m = str.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i))) return [+m[1], +m[2], +m[3]];
  return null;
}

// ---------- tokens ----------
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

export function loadTokens(root) {
  const all = new Map([
    ...flatten(readJson(join(root, "brand/tokens/primitive.tokens.json"))),
    ...flatten(readJson(join(root, "brand/tokens/semantic.tokens.json"))),
  ]);
  const resolveToken = (path, seen = new Set()) => {
    const t = all.get(path);
    if (!t) return null;
    if (typeof t.$value === "string" && /^\{.+\}$/.test(t.$value)) {
      const ref = t.$value.slice(1, -1);
      if (seen.has(ref)) throw new Error(`referencia circular en ${path}`);
      return resolveToken(ref, new Set([...seen, path]));
    }
    return t;
  };
  return { all, resolveToken };
}

/** Reemplaza "{ruta.token}" por su valor resuelto (hex para colores; "14px" para dimensiones). */
export function tokenValue(tokens, ref) {
  const t = tokens.resolveToken(ref);
  if (!t) return null;
  const v = t.$value;
  if (t.$type === "color") return v.hex;
  if (v && typeof v === "object" && "value" in v) return `${v.value}${v.unit}`;
  return v;
}

/** Recorre el spec y junta todas las referencias {…} con su ruta en el spec. */
export function collectRefs(node, path = [], out = []) {
  if (typeof node === "string") {
    for (const m of node.matchAll(/\{([a-z0-9.\-]+)\}/gi)) out.push({ ref: m[1], at: path.join(".") });
  } else if (Array.isArray(node)) node.forEach((v, i) => collectRefs(v, [...path, i], out));
  else if (node && typeof node === "object") for (const [k, v] of Object.entries(node)) collectRefs(v, [...path, k], out);
  return out;
}

/** Paleta completa permitida en piezas: todos los colores de tokens + extras del spec. */
export function brandPalette(tokens, spec) {
  const pal = new Map();
  for (const [path, t] of tokens.all) {
    if (t.$type !== "color" || typeof t.$value !== "object") continue;
    if (path.startsWith("color.gragi.neon") || path.startsWith("color.gragi.body")) continue; // excepción: sólo dentro del robot
    pal.set(t.$value.hex.toUpperCase(), path);
  }
  for (const h of spec.color.neutralsAllowedExtra) pal.set(h.toUpperCase(), "extra");
  return pal;
}

export const loadSpec = () => readJson(join(SKILL_DIR, "references/brand-spec.json"));
