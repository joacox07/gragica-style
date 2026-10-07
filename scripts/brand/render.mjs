#!/usr/bin/env node
/**
 * Renderiza una plantilla de marca (HTML) a PNG con Chrome headless.
 *
 *   node scripts/brand/render.mjs <plantilla.html> [--out <archivo.png>]
 *   node scripts/brand/render.mjs --all          renderiza todas las de brand/assets/templates → brand/assets/examples
 *
 * El tamaño sale del bloque <script type="application/json" id="piece"> de la plantilla
 * ({"width":1080,"height":1350,...}). Sin dependencias npm: usa el Chrome/Chromium instalado
 * (variable CHROME para elegir otro binario).
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const TEMPLATES = join(ROOT, "brand/assets/templates");
const EXAMPLES = join(ROOT, "brand/assets/examples");

function findChrome() {
  if (process.env.CHROME) return process.env.CHROME;
  const candidates = [
    "google-chrome", "google-chrome-stable", "chromium", "chromium-browser",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ];
  for (const c of candidates) {
    try {
      if (c.startsWith("/")) { if (existsSync(c)) return c; continue; }
      execFileSync("which", [c], { stdio: "ignore" });
      return c;
    } catch {}
  }
  throw new Error("No encontré Chrome/Chromium. Definí CHROME=/ruta/al/binario.");
}

export function readPiece(htmlPath) {
  const html = readFileSync(htmlPath, "utf8");
  const m = html.match(/<script[^>]*id=["']piece["'][^>]*>([\s\S]*?)<\/script>/i);
  if (!m) throw new Error(`${htmlPath}: falta <script type="application/json" id="piece">`);
  const piece = JSON.parse(m[1]);
  if (!piece.width || !piece.height) throw new Error(`${htmlPath}: el bloque piece necesita width y height`);
  return piece;
}

export function render(htmlPath, outPath) {
  htmlPath = resolve(htmlPath);
  const { width, height } = readPiece(htmlPath);
  outPath = resolve(outPath ?? join(EXAMPLES, basename(htmlPath).replace(/\.html?$/i, ".png")));
  const profile = mkdtempSync(join(tmpdir(), "gragica-render-"));
  try {
    execFileSync(findChrome(), [
      "--headless=new", "--disable-gpu", "--no-sandbox", "--hide-scrollbars",
      "--force-device-scale-factor=1", `--user-data-dir=${profile}`,
      `--window-size=${width},${height}`, "--virtual-time-budget=4000",
      `--screenshot=${outPath}`, pathToFileURL(htmlPath).href,
    ], { stdio: ["ignore", "ignore", "pipe"], timeout: 60_000 });
  } finally {
    rmSync(profile, { recursive: true, force: true });
  }
  if (!existsSync(outPath)) throw new Error(`Chrome no generó ${outPath}`);
  console.log(`✓ ${outPath} (${width}×${height})`);
  return outPath;
}

const args = process.argv.slice(2);
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (!args.length || args.includes("-h") || args.includes("--help")) {
    console.log("Uso: node scripts/brand/render.mjs <plantilla.html> [--out <png>] | --all");
    process.exit(args.length ? 0 : 1);
  }
  if (args[0] === "--all") {
    for (const f of readdirSync(TEMPLATES).filter((f) => f.endsWith(".html")).sort()) render(join(TEMPLATES, f));
  } else {
    const i = args.indexOf("--out");
    render(args[0], i >= 0 ? args[i + 1] : undefined);
  }
}
