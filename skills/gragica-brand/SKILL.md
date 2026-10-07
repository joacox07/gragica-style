---
name: gragica-brand
description: Diseñar, escribir o revisar cualquier pieza de la marca Gragica (SaaS de gestión escolar argentino) con sus parámetros exactos — anuncios 4:5, posts 1:1, stories/reels 9:16, carruseles, slides 16:9, documentos A4/PDF, imágenes Open Graph, headers de email, copy de marketing, y prompts para ChatGPT Images, Higgsfield o Canva. Usala también para auditar si una pieza existente cumple la marca. Use for any Gragica brand, design, marketing, social, ad, deck, document or generative-AI asset task.
---

# Gragica — skill de diseño de marca

Esta skill convierte el sistema de marca de Gragica en un **procedimiento con parámetros**. No improvises estilo:
cada decisión (color, tipo, tamaño, margen, palabra) sale de `references/brand-spec.json` o de los docs de `brand/`.
Si una decisión no está ahí, elegí la opción más sobria y decilo en la entrega.

> Esta skill vive en el repo **gragica-style** (plugin de Claude Code). `BRAND.md`, `brand/` y `scripts/brand/` están en la
> raíz de ese repo. Las rutas `packages/…`, `front/…` y `back/…` que aparecen acá son del **repo del producto**
> (github.com/valentinogrande/gragica), no de este.

## Dónde está todo

| Qué | Archivo | Cuándo leerlo |
|---|---|---|
| Puerta de entrada del sistema | `BRAND.md` (raíz del repo) | Siempre, primero (es corto) |
| **Parámetros en datos** | `references/brand-spec.json` | Siempre. Colores = referencias a tokens; formatos, tipo, logo, copy, evidencia, niveles |
| Formulario de brief | `references/piece-brief.schema.json` | Antes de diseñar |
| Recetas por formato | `references/formats.md` | El formato que vas a hacer |
| Autoevaluación | `references/rubric.md` | Antes de entregar |
| Prompts para IA generativa | `references/prompting.md` | Si la pieza usa ChatGPT Images / Higgsfield / Canva |
| Ejemplos y anti-ejemplos | `references/examples.md`, `assets/examples/` | Si dudás de cómo se ve “bien” |
| Tokens (valores) | `brand/tokens/*.tokens.json` | Para convertir `{color.brand.primary}` → `#2F6F2A` |
| Docs de marca | `brand/foundation/`, `brand/verbal/`, `brand/visual/`, `brand/applications/`, `brand/ai/` | Solo el que aplique |
| Logos | `brand/assets/logos/*.svg` | Siempre estos; nunca los PNG de `front/public/images` |
| Plantillas | `brand/assets/templates/*.html` | Punto de partida por formato |

En el bundle zip (claude.ai / ChatGPT), los archivos del repo están en `brand-root/` dentro de la skill.

## Flujo obligatorio

1. **Brief.** Completá `piece-brief` (formato, nivel, objetivo, público, titular + remate, evidencia, fondo, CTA).
   - Nivel: aplicá `brand-spec.json › levelDecision`. Ante la duda, el más bajo.
   - **No inventes datos.** Cifras, testimonios, nombres de colegios y fuentes se piden al usuario. Si no hay, la pieza es
     tipográfica (`evidence.type: "type-only"`) o usa una captura real con su pie.
   - Si el pedido es una pantalla de producto (nivel 1), no la diseñes acá: remití a `packages/ui` (y `/ds` en dev).
   - **Verificá cada afirmación sobre una función** en el producto: `packages/app/src/screens/<función>/` y la ayuda
     `packages/app/src/help/catalog/` (lo que la ayuda explica, existe). Si no podés verificarlo, no lo afirmes.
   - Capturas: usá las reales que existen (`spec › evidence`). Si falta una, pedila al usuario; nunca la armes ni la generes
     (`spec › verify.newScreenshots` explica cómo se capturan sin datos de menores reales).
   - Elegí la **estructura** (A afirmación · B + captura · C dato · D documento, `spec › structures`) y anotala en el brief.
2. **Cargá solo lo necesario.** `brand-spec.json` + la receta del formato en `formats.md` + el doc de `brand/` que aplique.
3. **Escribí el titular primero.** Afirmación ≤ `formats[f].maxWordsHeadline` palabras, termina en punto, remate al final.
   Probá 3 opciones y quedate con la más concreta (ver `brand/verbal/COPY_GUIDELINES.md`).
4. **Componé** desde la plantilla del formato o desde cero:
   - lienzo, márgenes, safe zone, columnas y tamaños de `formats[f]`;
   - colores solo de la paleta (variables CSS con los hex de los tokens);
   - Source Serif 4 para display/heading/figure, Source Sans 3 para lo demás (`type.roles`);
   - el remate en `<em class="remate">` con `{color.brand.primary}` (o `{color.dark.primary}` sobre noche);
   - logo oficial según fondo (`logo.byBackground`), dentro de márgenes, ancho de `formats[f].logo.widthPx`;
   - el brief embebido en `<script type="application/json" id="piece">`.
   - las fuentes cargadas con `@font-face` desde `assets/fonts/` (OFL) y Google Fonts de respaldo; sin ellas el render cae en Georgia.
5. **Lint.** `node skills/gragica-brand/scripts/lint-piece.mjs pieza.html` → corregí hasta **0 errores**; leé cada aviso.
6. **Render y mirá.** `node skills/gragica-brand/scripts/render.mjs pieza.html` → abrí el PNG. El lint no ve
   superposiciones, recortes feos ni jerarquía: eso lo ves vos. Mirala también al 25 % (como en un feed).
7. **Autoevaluación** con `references/rubric.md`. Menos de 90 % → iterá.
8. **Entrega:** PNG + HTML + brief + puntaje de la rúbrica + qué decidiste que no estaba en el spec.

**Rama solo-prompt** (ChatGPT Images, Higgsfield, Midjourney): brief → `references/prompting.md` → prompt + negativos +
postproducción. **Nunca** se generan con IA el logo, la tipografía, pantallas del producto, personas presentadas como
reales ni menores. Texto y logo se componen después, en HTML/Canva, con esta misma skill.

## Reglas duras (si violás una, la pieza no sale)

1. **Nada inventado:** ni cifras, ni testimonios, ni colegios clientes, ni capturas armadas. Capturas reales con pie
   «Captura real · datos ficticios».
2. **Un solo verde** `#2F6F2A` (`{color.brand.primary}`); sobre verde noche `#5BAE66`. Nunca `#227C57`, `#2F7932`, `#306D29`.
3. **Solo Source Serif 4 + Source Sans 3.** Serif nunca en botones, inputs, tablas ni navegación.
4. **El remate** en niveles 3–4: titular serif, punto final, última palabra/línea en verde.
5. **Voseo**, sin emojis, ≤ 1 «!», sin palabras de `copy.forbiddenWords` («revolucionar», «potente», «impulsado por IA»…).
6. **Sin efectos:** degradados, vidrio (`backdrop-filter`), glow, sombras grandes, mockups en perspectiva, blobs.
7. **Logo oficial SVG**, sin modificar, con su zona de resguardo; versión blanca sobre fondos oscuros.
8. **Menores:** ningún rostro identificable sin consentimiento escrito de familia y colegio.
9. **Gragi** (robot) tal cual, solo si la pieza habla del asistente, nunca en institucional, nunca prometido a alumnos/familias.
10. **El escudo del colegio** no se recolorea ni se recorta; el colegio es protagonista en co-branding.

## Parámetros rápidos (el detalle está en el spec)

| | ad-4x5 | post-1x1 | story-9x16 | slide-16x9 | og | a4 |
|---|---|---|---|---|---|---|
| Lienzo | 1080×1350 | 1080×1080 | 1080×1920 | 1920×1080 | 1200×630 | 794×1123 (210×297 mm) |
| Márgenes x / arriba / abajo | 88/96/88 | 80/80/80 | 72/250/340 | 120/96/96 | 72/64/64 | 76 (20 mm) |
| Display (px) | 96–128 | 88–112 | 104–140 | 96–140 | 72–92 | 36–44 |
| Bajada (px) | 34–40 | 32–36 | 38–44 | 36–44 | — | 13–14 |
| Logo (ancho) | 200–240 | 180–220 | 220–260 | isotipo 40–48 | 200–220 | 120–140 |
| Titular máx. palabras | 8 | 7 | 8 | 6 | 7 | 10 |

Colores base: papel `#FCFDFC` · blanco `#FFFFFF` · filete `#E0E7DF` · tinta `#1F2023` / `#4E5156` / `#61656B` ·
verde `#2F6F2A` · verde noche `#0D1C0D` · texto sobre noche `#CAD8CA` · verde sobre noche `#5BAE66` ·
dorado `#C98E18` (texto `#8D6411`, sobre noche `#EAB448`). Máximo un acento dorado por pieza.

## Verificación del propio sistema

- `node skills/gragica-brand/scripts/spec-check.mjs`: el spec coincide con tokens, logos y plantillas.
- `node scripts/brand/check-tokens.mjs`: los tokens coinciden con el código del producto.
- `node skills/gragica-brand/scripts/build-bundle.mjs`: arma `brand/dist/gragica-brand-skill.zip` para claude.ai / ChatGPT.

Si cambia la marca, se cambian primero `brand/tokens` y los docs; después el spec (ver `brand/GOVERNANCE.md`).
