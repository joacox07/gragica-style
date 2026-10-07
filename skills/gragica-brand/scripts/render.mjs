#!/usr/bin/env node
/**
 * Renderiza una pieza HTML a PNG en su tamaño exacto (lo toma del brief embebido id="piece").
 * Si el repo tiene scripts/brand/render.mjs, delega en él; si no, usa Chrome/Chromium headless.
 *
 *   node skills/gragica-brand/scripts/render.mjs pieza.html [--out pieza.png] [--scale 1]
 */
import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { findBrandRoot } from "./lib.mjs";

const args = process.argv.slice(2);
const file = args.find((a) => /\.html?$/i.test(a)) ?? args.find((a, i) => !a.startsWith("--") && !["--out", "--scale"].includes(args[i - 1]));
if (!file) { console.error("Uso: render.mjs <pieza.html> [--out salida.png] [--scale 1]"); process.exit(2); }
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const out = resolve(opt("--out", file.replace(/\.html?$/i, ".png")));
const scale = Number(opt("--scale", "1"));

let root = null;
try { root = findBrandRoot(); } catch {}
const repoRender = root && join(root, "scripts/brand/render.mjs");
if (repoRender && existsSync(repoRender) && !args.includes("--standalone")) {
  const r = spawnSync(process.execPath, [repoRender, file, "--out", out], { stdio: "inherit" });
  process.exit(r.status ?? 1);
}

const src = readFileSync(file, "utf8");
const m = src.match(/<script[^>]+id=["']piece["'][^>]*>([\s\S]*?)<\/script>/);
const piece = m ? JSON.parse(m[1]) : {};
const w = piece.width ?? 1080, h = piece.height ?? 1350;

const candidates = [process.env.CHROME, "google-chrome", "google-chrome-stable", "chromium", "chromium-browser",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"].filter(Boolean);
const chrome = candidates.find((c) => { try { execFileSync(c, ["--version"], { stdio: "ignore" }); return true; } catch { return false; } });
if (!chrome) { console.error("No encontré Chrome/Chromium. Definí CHROME=/ruta/al/binario."); process.exit(1); }

const r = spawnSync(chrome, [
  "--headless=new", "--disable-gpu", "--no-sandbox", "--hide-scrollbars", "--allow-file-access-from-files",
  `--force-device-scale-factor=${scale}`, `--window-size=${w},${h}`, "--virtual-time-budget=4000",
  `--screenshot=${out}`, pathToFileURL(resolve(file)).href,
], { stdio: ["ignore", "pipe", "pipe"] });
if (r.status !== 0 || !existsSync(out)) { console.error(r.stderr.toString()); process.exit(1); }
console.log(`✓ ${out} (${w * scale}×${h * scale})`);
