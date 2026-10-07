# BRAND.md — Gragica

> Puerta de entrada al sistema de marca. Leé esto primero; el detalle está en [`brand/`](brand/README.md).
> Versión de marca: **1.0.0** (2026-10-07). Cambios: ver [GOVERNANCE](brand/GOVERNANCE.md).

## Manifiesto corto

Gragica es la gestión de un colegio argentino, entera, en un solo lugar: notas, asistencia, boletines,
comunicados, horarios y un asistente que trabaja. Lo construimos para colegios que cuidan datos de
menores y no tienen tiempo que perder.

No prometemos revolucionar la educación. Mostramos la pantalla real, decimos qué hace y qué no,
y escribimos como habla una persona de Rosario que sabe de lo que habla.

**Gragica suena a:** un colega prolijo que te resuelve el trámite y te dice la verdad.
**Gragica se ve como:** un documento escolar bien hecho, impreso hoy: papel, tinta, un verde bosque y datos reales.

## El núcleo que nunca cambia

Todo lo que lleva la marca, en cualquier nivel, comparte estas siete cosas. Si una pieza no tiene al menos cuatro,
no es Gragica.

| # | Activo | Regla corta | Detalle |
|---|---|---|---|
| 1 | **La G** | Isotipo vectorial `brand/assets/logos/gragica-mark.svg`. No se redibuja, no se rota, no se le aplican efectos. | [LOGO](brand/visual/LOGO.md) |
| 2 | **Verde Gragica** | `#2F6F2A` · `hsl(116 45% 30%)`. Uno solo. Sobre fondo oscuro, `#5BAE66`. | [COLOR](brand/visual/COLOR.md) |
| 3 | **Papel + tinta** | Fondo `#FCFDFC`/blanco, texto `#1F2023`. Su versión oscura (verde noche `#0D1C0D` + texto claro) cuenta como este mismo activo. | [COLOR](brand/visual/COLOR.md) |
| 4 | **Familia Source** | Source Serif 4 para afirmar, Source Sans 3 para todo lo demás. | [TYPOGRAPHY](brand/visual/TYPOGRAPHY.md) |
| 5 | **El remate** | Titular en serif, frase corta, termina con punto; la última palabra o línea en verde. «La gestión de tu colegio, **entera.**» | [DISTINCTIVE_ASSETS](brand/visual/DISTINCTIVE_ASSETS.md) |
| 6 | **Evidencia** | Producto real, datos reales o declarados ficticios. Nunca una cifra, testimonio o pantalla inventada. | [PRINCIPLES](brand/foundation/PRINCIPLES.md) |
| 7 | **La voz** | Voseo rioplatense, frases cortas, consecuencias concretas, cero hype, cero emojis. | [VOICE_AND_TONE](brand/verbal/VOICE_AND_TONE.md) |

## Niveles de expresión

La marca es una sola; la intensidad cambia según dónde aparece. Detalle en [EXPRESSION_LEVELS](brand/foundation/EXPRESSION_LEVELS.md).

| Nivel | Dónde | En una línea |
|---|---|---|
| **1 · Producto** | App web, Tauri, emails transaccionales | Silenciosa y funcional. Sans, verde solo para acción y estado. El sistema de diseño vive en `packages/ui`. |
| **2 · Institucional** | PDFs, membretes, propuestas, documentación, co-branding | Sobria y editorial. Serif en títulos, filetes, cifras tabulares. |
| **3 · Marketing** | Web pública, social, anuncios, presentaciones | Expresiva. El remate grande, capturas reales en marco, bandas verde noche. |
| **4 · Campaña** | Campañas con nombre propio y fechas (inicio de ciclo lectivo, eventos) | Máxima libertad de escala, color y ritmo. El núcleo no se toca. |

## Quick-start: “tengo que hacer una pieza”

1. **¿Qué nivel es?** Elegilo en la tabla de arriba.
2. **¿Qué formato?** Abrí la plantilla en [`brand/assets/templates/`](brand/assets/templates/) (4:5, 1:1, 9:16, 16:9, A4, OG).
3. **Escribí primero el titular.** Una afirmación, termina en punto, con remate. Probalo contra [COPY_GUIDELINES](brand/verbal/COPY_GUIDELINES.md).
4. **Elegí la evidencia:** captura real ([cómo](brand/visual/DISTINCTIVE_ASSETS.md#3-el-marco)), dato con fuente o frase de un colegio real. Sin evidencia, la pieza es tipográfica.
5. **Renderizá:** `node scripts/brand/render.mjs <plantilla.html>`.
6. **Pasá el checklist** de [ADS](brand/applications/ADS.md#checklist) o del formato que corresponda.

¿Usás IA para generar? Leé [GENERATIVE_AI](brand/ai/GENERATIVE_AI.md) antes. Brief listo para pegar: [AGENT_BRIEF](brand/ai/AGENT_BRIEF.md).

Los valores numéricos (secciones **Parámetros** de cada doc) tienen una versión para máquinas en `skills/gragica-brand/references/brand-spec.json`, que usa la skill de Claude Code para validar piezas. Docs y spec deben coincidir ([GOVERNANCE](brand/GOVERNANCE.md)).

## Reglas que no se discuten

- **No inventamos.** Ni testimonios, ni cifras de uptime, ni colegios clientes, ni capturas armadas. Si un dato es demo, se dice al pie.
- **Menores:** ninguna pieza muestra el rostro identificable de un alumno sin consentimiento escrito de su familia y del colegio.
- **Un solo verde de marca** (`#2F6F2A`, y `#5BAE66` sobre oscuro). Los demás verdes son funcionales (estados, gráficos) y no se usan como marca. Los PNG viejos (`#227C57`, `#2F7932`, `#306D29`) son legado; lo nuevo usa `#2F6F2A`.
- **El serif no entra a los controles de la interfaz** (botones, inputs, menús, tablas).
- **El colegio es dueño de su escudo.** No se recolorea, no se recorta, no se pone al lado de la G sin un separador.
- **Gragi** (el robot) es la mascota oficial del asistente. Se usa tal cual; su verde neón no sale del personaje.
- **Prohibido:** degradados decorativos, glassmorphism, blobs, mockups flotando en perspectiva, stock de “chicos levantando la mano”, “revolucionamos la educación”, emojis.

## Mapa del sistema

```
BRAND.md                 ← estás acá
brand/
  foundation/            posicionamiento, principios, personalidad, niveles
  verbal/                voz y tono, guía de copy, vocabulario
  visual/                logo, color, tipografía, layout, activos distintivos, íconos,
                         fotografía, ilustración (y Gragi), motion, datos
  applications/          producto, web, social, anuncios, presentaciones, impresión,
                         video, merch, co-branding, Canva y Google Slides
  ai/                    IA generativa, prompts de imagen y video, brief para agentes
  tokens/                tokens DTCG (espejo verificado de packages/ui)
  assets/                logos SVG, plantillas HTML, ejemplos renderizados
  GOVERNANCE.md          quién es fuente de verdad, cómo se cambia
scripts/brand/           check-tokens.mjs · render.mjs · build_logo.py
skills/gragica-brand/   skill para Claude Code
```

## Preguntas frecuentes → dónde está

| Pregunta | Archivo |
|---|---|
| ¿Qué tipografía uso? ¿Cómo hago un headline? | [TYPOGRAPHY](brand/visual/TYPOGRAPHY.md) |
| ¿Qué fondo corresponde? ¿Cómo conviven dos colores? | [COLOR](brand/visual/COLOR.md) |
| ¿Cómo muestro el producto? | [DISTINCTIVE_ASSETS § El marco](brand/visual/DISTINCTIVE_ASSETS.md#3-el-marco) |
| ¿Cómo trato una fotografía? | [PHOTOGRAPHY](brand/visual/PHOTOGRAPHY.md) |
| ¿Cómo hago un gráfico? | [DATA_VISUALIZATION](brand/visual/DATA_VISUALIZATION.md) |
| ¿Cómo aparece un colegio? | [COBRANDING](brand/applications/COBRANDING.md) |
| ¿Cuánto puedo modificar la marca para una campaña? | [EXPRESSION_LEVELS](brand/foundation/EXPRESSION_LEVELS.md) |
| ¿Cómo hago una Story? | [SOCIAL](brand/applications/SOCIAL.md) |
| ¿Cómo animo el logo? | [MOTION](brand/visual/MOTION.md) |
| ¿Cómo escribo un CTA? | [COPY_GUIDELINES](brand/verbal/COPY_GUIDELINES.md) |
| ¿Cómo genero una imagen con IA? | [IMAGE_PROMPTS](brand/ai/IMAGE_PROMPTS.md) |
| ¿Cómo hago algo nuevo sin que deje de parecer Gragica? | [DISTINCTIVE_ASSETS § Gramática](brand/visual/DISTINCTIVE_ASSETS.md#gramática-cómo-se-combinan) |
