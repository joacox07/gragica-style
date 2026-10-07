# gragica-style

Sistema de marca de **Gragica**: la fuente de verdad para que cualquier persona o IA haga una pieza
(anuncio, post, story, slide, documento, video) que se reconozca como Gragica.

- **Empezá por [`BRAND.md`](BRAND.md)**: manifiesto, núcleo que nunca cambia, niveles de expresión y mapa de todo lo demás.
- **[`brand/`](brand/README.md)**: fundación, voz, visual, aplicaciones, IA generativa, tokens, logos y plantillas.
- **[`skills/gragica-brand/`](skills/gragica-brand/SKILL.md)**: skill de Claude Code que diseña piezas siguiendo el sistema,
  con lint y render automáticos.

El producto (app, web, back) vive en otro repo: [valentinogrande/gragica](https://github.com/valentinogrande/gragica).
Cuando un documento menciona rutas como `packages/ui/…`, `front/…` o `back/…`, se refiere a ese repo.

## Usarlo con Claude Code (plugin)

```bash
# una vez por máquina
claude plugin marketplace add joacox07/gragica-style
claude plugin install gragica-style@gragica
```

Después, desde cualquier carpeta: *“Hacé un anuncio 4:5 de Gragica para la función de biblioteca”*. La skill
`gragica-brand` se activa sola con pedidos de piezas de Gragica.

Para actualizar: `claude plugin update gragica-style`.

Para trabajar sobre el sistema en sí, cloná el repo y abrí Claude Code adentro: la skill y los docs se leen desde acá.

## Usarlo con otras IAs

- **ChatGPT / Codex / Gemini:** pegá [`brand/ai/AGENT_BRIEF.md`](brand/ai/AGENT_BRIEF.md) antes del pedido. Si pueden
  leer el repo, pediles que lean `BRAND.md`.
- **claude.ai:** `node skills/gragica-brand/scripts/build-bundle.mjs` arma un zip de la skill para subir.
- **Imágenes y video con IA:** [`brand/ai/IMAGE_PROMPTS.md`](brand/ai/IMAGE_PROMPTS.md), [`brand/ai/VIDEO_PROMPTS.md`](brand/ai/VIDEO_PROMPTS.md).
- **Canva / Google Slides:** [`brand/applications/CANVA_AND_SLIDES.md`](brand/applications/CANVA_AND_SLIDES.md).

## Comandos

Requieren Node ≥ 18 y Chrome/Chromium. No hay dependencias npm.

```bash
node scripts/brand/render.mjs brand/assets/templates/ad-4x5.html --out pieza.png   # HTML → PNG
node scripts/brand/render.mjs --all                                               # regenera brand/assets/examples/
node scripts/brand/check-tokens.mjs --product ../gragica                          # tokens de marca vs. producto + contraste
node skills/gragica-brand/scripts/lint-piece.mjs pieza.html                       # valida una pieza contra el spec
node skills/gragica-brand/scripts/spec-check.mjs                                  # el spec coincide con tokens, logos y plantillas
python3 scripts/brand/build_logo.py --help                                        # regenera los SVG del logo
```

`check-tokens` busca el repo del producto en `--product`, en `GRAGICA_REPO` o en `../gragica`.

## Contenido

| | |
|---|---|
| `BRAND.md` | Puerta de entrada |
| `brand/foundation/` | Posicionamiento, principios, personalidad, niveles de expresión |
| `brand/verbal/` | Voz y tono, guía de copy, vocabulario |
| `brand/visual/` | Logo, color, tipografía, layout, activos distintivos, íconos, foto, ilustración (y Gragi), motion, datos |
| `brand/applications/` | Producto, web, social, anuncios, presentaciones, impresión, video, merch, co-branding, Canva/Slides |
| `brand/ai/` | Reglas de IA generativa, prompts de imagen y video, brief para agentes |
| `brand/tokens/` | Tokens DTCG (espejo verificado del producto) |
| `brand/assets/` | Logos SVG/PNG, plantillas HTML, ejemplos, capturas reales del producto, Gragi |
| `brand/GOVERNANCE.md` | Qué es fuente de verdad, cómo agregar cosas, versionado |

Versión de marca: ver el encabezado de `BRAND.md`.
