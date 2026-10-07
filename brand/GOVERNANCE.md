# Gobernanza

## Fuentes de verdad

| Qué | Fuente de verdad | Generado / espejo | ¿Se edita a mano? |
|---|---|---|---|
| Tokens del **producto** | `packages/ui/src/styles/tokens.css` + `packages/ui/src/lib/palette.ts` | — | Sí, siguiendo `CLAUDE.md` |
| Tokens de **marca** | `brand/tokens/*.tokens.json` (DTCG) | Espejo verificado del producto | Sí, y `check-tokens` tiene que dar verde |
| Tabla de color en `COLOR.md` | `check-tokens.mjs --table` | Generada | No: se regenera |
| Logos | `brand/assets/logos/*.svg` | `brand/assets/logos/png/*` (exportaciones) | SVG solo con `build_logo.py`; PNG se regeneran |
| Plantillas | `brand/assets/templates/*.html` | `brand/assets/examples/*.png` | HTML sí; PNG se regeneran con `render.mjs --all` |
| Reglas | `BRAND.md` + `brand/**/*.md` | — | Sí |
| Skill de Claude Code | `skills/gragica-brand/` | — | La mantiene su dueño (ver la skill) |

Hoy el **producto manda**: si `tokens.css` cambia un color, el JSON de marca se actualiza para seguirlo (o se
discute el cambio). Cuando se apruebe tocar código, el plan es invertirlo: generar la parte de marca de `tokens.css` y
`palette.ts` desde el JSON con un generador propio (sin dependencias, porque el tono del colegio se resuelve en runtime).

## Cómo…

**…agregar un token:** primitivo en `primitive.tokens.json` con `$description` y, si existe en el código,
`$extensions.com.gragica.source` (`css` + `mode`, o `ts`). Si es de uso, un semántico que lo referencie. Correr
`node scripts/brand/check-tokens.mjs`. Si es un color de texto, agregar su par a `PAIRS` en el script.

**…agregar un asset:** SVG vectorial en `brand/assets/`, nombre `gragica-<qué>-<variante>.svg`, en minúsculas. Si
viene de IA, prefijo `ai-` y prompt en `.txt` al lado. Documentarlo en el `.md` que corresponda.

**…agregar una plantilla:** HTML autocontenido en `brand/assets/templates/` con el bloque `<script id="piece">`
(`format`, `width`, `height`, `level`, campos de texto), colores solo como variables en `:root`, render con
`render.mjs`, PNG en `examples/`, y una fila en el doc de aplicación.

**…agregar un componente de producto:** no es de este sistema: va a `packages/ui` siguiendo `CLAUDE.md`.

**…documentar una excepción:** en el doc correspondiente, sección “Excepciones”, con qué, por qué, quién lo aprobó,
fecha y hasta cuándo. Ejemplo vigente: el verde neón de Gragi ([ILLUSTRATION](visual/ILLUSTRATION.md#gragi)).

## Evitar divergencia código ↔ documentación

- `node scripts/brand/check-tokens.mjs` compara el JSON con `tokens.css`/`palette.ts` y valida contraste.
  Correrlo cuando se toque cualquiera de los tres. *(Pendiente: sumarlo a CI.)*
- Los docs citan rutas del código; si se mueve un archivo, buscar la ruta en `brand/`.
- `scripts/redesign-grep.sh` sigue siendo la guarda de colores sueltos en el producto.

## Versionado

Semver en el encabezado de `BRAND.md`:

- **MAJOR:** cambia algo del núcleo (logo, verde, tipografías, voz).
- **MINOR:** se agrega un activo, plantilla, formato o regla.
- **PATCH:** correcciones, ejemplos, aclaraciones.

Cada cambio de versión deja una línea en el historial de abajo.

## Auditoría periódica (trimestral)

1. `node scripts/brand/check-tokens.mjs`
2. `node scripts/brand/render.mjs --all` y revisar los PNG.
3. `scripts/redesign-grep.sh` en el producto.
4. Revisar las últimas 10 piezas publicadas contra el checklist de [ADS](applications/ADS.md#checklist).
5. Repasar la lista interna de deuda de marca del producto (no pública): qué se resolvió y qué se prioriza.

## Historial

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 2026-10-07 | Primera versión del sistema: fundación, verbal, visual, aplicaciones, IA, tokens DTCG, logos SVG, plantillas. |
