#!/usr/bin/env node
/**
 * Arma un zip autocontenido de la skill para usarla fuera del repo:
 * claude.ai (Settings › Capabilities › Skills › subir zip) o ChatGPT (adjuntar / archivos de un Project).
 *
 *   node skills/gragica-brand/scripts/build-bundle.mjs [--out ruta.zip]
 *
 * Por defecto escribe brand/dist/gragica-brand-skill.zip (no versionar: es generado).
 * Estructura del zip:
 *   gragica-brand/SKILL.md, references/, scripts/, assets/examples/
 *   gragica-brand/brand-root/  ← BRAND.md, brand/** (md, tokens, logos, plantillas), scripts/brand/*.mjs,
 *                                 y las capturas/imágenes que usan los ejemplos
 * Los scripts encuentran brand-root/ solos (lib.mjs › findBrandRoot).
 */
import { cpSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { SKILL_DIR, findBrandRoot } from "./lib.mjs";

const args = process.argv.slice(2);
const root = findBrandRoot();
const outArg = args.includes("--out") ? args[args.indexOf("--out") + 1] : null;
const out = resolve(outArg ?? join(root, "brand/dist/gragica-brand-skill.zip"));

const stage = mkdtempSync(join(tmpdir(), "gragica-skill-"));
const dest = join(stage, "gragica-brand");
const br = join(dest, "brand-root");
mkdirSync(br, { recursive: true });

// 1. La skill (sin node_modules ni PNG pesados que no sean ejemplos)
for (const p of ["SKILL.md", "references", "scripts", "assets"]) {
  const s = join(SKILL_DIR, p);
  if (existsSync(s)) cpSync(s, join(dest, p), { recursive: true });
}

// 2. El sistema de marca
const keepExt = /\.(md|json|svg|png|webp|html)$/i;
const copyFiltered = (from, to) => {
  if (!existsSync(from)) return;
  for (const e of readdirSync(from, { withFileTypes: true })) {
    const s = join(from, e.name), d = join(to, e.name);
    if (e.isDirectory()) { if (e.name !== "dist") copyFiltered(s, d); }
    else if (keepExt.test(e.name)) { mkdirSync(dirname(d), { recursive: true }); cpSync(s, d); }
  }
};
cpSync(join(root, "BRAND.md"), join(br, "BRAND.md"));
copyFiltered(join(root, "brand"), join(br, "brand"));
for (const f of ["render.mjs", "check-tokens.mjs"]) {
  const s = join(root, "scripts/brand", f);
  if (existsSync(s)) { mkdirSync(join(br, "scripts/brand"), { recursive: true }); cpSync(s, join(br, "scripts/brand", f)); }
}

// 3. Imágenes del repo que referencian los ejemplos y plantillas (capturas reales, Gragi)
const htmls = [join(dest, "assets/examples"), join(br, "brand/assets/templates")]
  .filter(existsSync).flatMap((d) => readdirSync(d).filter((f) => f.endsWith(".html")).map((f) => join(d, f)));
const needed = new Set(); // brand/ entra entero (capturas en brand/assets/screenshots, Gragi en brand/assets/gragi)
for (const rel of needed) {
  const s = join(root, rel);
  if (existsSync(s)) { mkdirSync(dirname(join(br, rel)), { recursive: true }); cpSync(s, join(br, rel)); }
}

// 4. Reescribir rutas de los ejemplos: en el repo suben 4 niveles hasta la raíz; en el zip, hasta brand-root/
for (const f of readdirSync(join(dest, "assets/examples")).filter((f) => f.endsWith(".html"))) {
  const p = join(dest, "assets/examples", f);
  writeFileSync(p, readFileSync(p, "utf8").replaceAll("../../../../", "../../brand-root/"));
}

// 5. Nota de uso fuera del repo
writeFileSync(join(dest, "README-bundle.md"), `# gragica-brand (bundle)

Skill de diseño de marca de Gragica, empaquetada el ${new Date().toISOString().slice(0, 10)}.

- **claude.ai:** Settings › Capabilities › Skills › subir este zip.
- **ChatGPT:** adjuntá el zip (o SKILL.md + references/brand-spec.json + brand-root/BRAND.md) a un Project y pedile:
  «Seguí SKILL.md de gragica-brand para hacer <pieza>».
- **Codex / Claude Code:** no hace falta el zip; instalá el plugin del repo gragica-style (\`skills/gragica-brand\`; Codex: \`.agents/skills/gragica-brand\`).

Las rutas \`brand/…\`, \`BRAND.md\` y \`scripts/brand/…\` que mencionan los documentos están dentro de \`brand-root/\`.
Si el entorno puede ejecutar Node ≥ 18: \`node scripts/lint-piece.mjs pieza.html\`.
`);

// 6. Zip
mkdirSync(dirname(out), { recursive: true });
if (existsSync(out)) rmSync(out);
execFileSync("zip", ["-qr", out, "gragica-brand"], { cwd: stage });
const size = statSync(out).size;
const count = execFileSync("unzip", ["-Z1", out]).toString().trim().split("\n").length;
rmSync(stage, { recursive: true, force: true });
console.log(`✓ ${relative(process.cwd(), out) || out}  (${count} archivos, ${(size / 1024 / 1024).toFixed(1)} MB)`);
