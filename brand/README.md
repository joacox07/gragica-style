# brand/

Sistema de marca de Gragica. Empezá por [`../BRAND.md`](../BRAND.md).

| Carpeta | Contenido |
|---|---|
| [`foundation/`](foundation/) | [POSITIONING](foundation/POSITIONING.md) · [PRINCIPLES](foundation/PRINCIPLES.md) · [PERSONALITY](foundation/PERSONALITY.md) · [EXPRESSION_LEVELS](foundation/EXPRESSION_LEVELS.md) |
| [`verbal/`](verbal/) | [VOICE_AND_TONE](verbal/VOICE_AND_TONE.md) · [COPY_GUIDELINES](verbal/COPY_GUIDELINES.md) · [VOCABULARY](verbal/VOCABULARY.md) |
| [`visual/`](visual/) | [LOGO](visual/LOGO.md) · [COLOR](visual/COLOR.md) · [TYPOGRAPHY](visual/TYPOGRAPHY.md) · [LAYOUT](visual/LAYOUT.md) · [DISTINCTIVE_ASSETS](visual/DISTINCTIVE_ASSETS.md) · [ICONOGRAPHY](visual/ICONOGRAPHY.md) · [PHOTOGRAPHY](visual/PHOTOGRAPHY.md) · [ILLUSTRATION](visual/ILLUSTRATION.md) · [MOTION](visual/MOTION.md) · [DATA_VISUALIZATION](visual/DATA_VISUALIZATION.md) |
| [`applications/`](applications/) | [PRODUCT](applications/PRODUCT.md) · [WEB](applications/WEB.md) · [SOCIAL](applications/SOCIAL.md) · [ADS](applications/ADS.md) · [PRESENTATIONS](applications/PRESENTATIONS.md) · [PRINT](applications/PRINT.md) · [VIDEO](applications/VIDEO.md) · [MERCH](applications/MERCH.md) · [COBRANDING](applications/COBRANDING.md) · [CANVA_AND_SLIDES](applications/CANVA_AND_SLIDES.md) |
| [`ai/`](ai/) | [GENERATIVE_AI](ai/GENERATIVE_AI.md) · [IMAGE_PROMPTS](ai/IMAGE_PROMPTS.md) · [VIDEO_PROMPTS](ai/VIDEO_PROMPTS.md) · [AGENT_BRIEF](ai/AGENT_BRIEF.md) · [CHATGPT_PROJECT](ai/CHATGPT_PROJECT.md) |
| [`tokens/`](tokens/README.md) | Tokens DTCG, espejo verificado de `packages/ui` |
| `assets/logos/` | SVG maestros + `png/` exportados |
| `assets/templates/` | Plantillas HTML (4:5, 1:1, 9:16, 16:9, A4, OG) |
| `assets/examples/` | PNG renderizados de las plantillas (generados) |
| [GOVERNANCE](GOVERNANCE.md) | Fuentes de verdad, cómo agregar cosas, versionado |

Cada doc visual y de aplicación termina con **`## Parámetros`**: un bloque YAML con los valores numéricos para
agentes y herramientas.

## Comandos

```bash
node scripts/brand/check-tokens.mjs            # tokens de marca vs. código + contraste
node scripts/brand/check-tokens.mjs --table    # + tabla de color en Markdown
node scripts/brand/render.mjs brand/assets/templates/ad-4x5.html --out pieza.png
node scripts/brand/render.mjs --all            # regenera brand/assets/examples/
python3 scripts/brand/build_logo.py --help     # regenera los SVG del logo (requiere fonttools, potracer, uharfbuzz)
```
