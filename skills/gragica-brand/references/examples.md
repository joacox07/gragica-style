# Ejemplos resueltos

Archivos en `assets/examples/`. Cada ejemplo: brief → HTML → PNG → lint → rúbrica.

## 1. Anuncio 4:5 · «Las notas, sin Excel.» (nivel 3, papel, captura real)

`2026-10-07_ad-4x5_calificaciones.html` / `.png`

- **Brief:** feature de calificaciones para dirección. Evidencia: captura real `brand/assets/screenshots/calificaciones.webp`.
- **Decisiones:**
  - El titular tiene 4 palabras y el remate es «sin Excel.», el problema que se termina.
  - La captura sangra a la derecha: el producto «sigue» fuera del cuadro. Alto fijo de 440px, para que no tape la firma.
  - El pie «Captura real · datos ficticios» va a 24px del marco.
  - Logo a 220px abajo a la izquierda; CTA de texto a la derecha.
- **Lint:** 0 errores, 0 avisos.
- **Rúbrica:** 97/100. Descuento en 12: la captura muestra «Educacion Fisica» sin tilde, un dato demo del producto
  pendiente de corregir.
- **Iteración real:** en la primera versión la captura (alto automático) tapaba el pie y el logo. El lint no lo vio y el PNG
  sí. Por eso el paso 6 del flujo es obligatorio.

## 2. Story 9:16 · «La falta le llega a la familia. Sola.» (nivel 3, noche, tipográfica)

`2026-10-07_story-9x16_asistencia.html` / `.png`

- **Brief:** feature de asistencia. Sin evidencia visual (`type-only`): la frase alcanza.
- **Decisiones:**
  - Fondo verde noche `#0D1C0D`; remate en `#5BAE66` (el `#2F6F2A` daría 2,88:1: par prohibido).
  - Bajada en `#CAD8CA`.
  - Logo blanco a 250px del borde superior (safe zone de Stories); CTA a 1510px, antes de la zona tapada.
  - Filete de 1px `rgba(255,255,255,.14)`.
- **Lint:** 0 errores, 0 avisos.
- **Rúbrica:** 96/100.

## 3. Anti-ejemplo · «¡Revolucionamos la educación con IA de vanguardia!»

`anti_ad-4x5_revolucion.html`: sembrado a propósito; **no copiar**. El lint lo rechaza con casi 30 errores:

- **Color:** degradado violeta→rosa, verde neón de Gragi como texto, turquesa viejo `#227C57`.
- **Tipografía:** Inter cargada desde Google Fonts; serif dentro de un `<button>`.
- **Efectos:** vidrio (`backdrop-filter`), glow, mockup en perspectiva, sombra grande.
- **Copy:** emoji, dos exclamaciones, «revolucionar», «de vanguardia», «potente», «100% segura», «la mejor plataforma»,
  tuteo («puedes», «Descubre»), CTA «Saber más», «escuelas».
- **Titular y logo:** sin punto final ni remate; PNG viejo del logo.
- **Evidencia:** cifra («100% uptime») sin fuente.

Así se ve el «SaaS genérico / AI slop» que la marca evita.

## Cómo pedirle una pieza a otra IA (prompt corto)

> Usá la skill `gragica-brand`. Hacé un **post 1:1** de nivel 3 sobre **comunicados con acuse de lectura**, para
> directivos. Evidencia: captura real `brand/assets/screenshots/mensajes.webp`. Seguí el flujo: brief → HTML →
> lint → render → rúbrica, y entregame PNG + HTML + brief + puntaje.

Si la IA no puede ejecutar scripts (por ejemplo, ChatGPT sin herramientas), igual tiene que entregar el brief y el HTML y
autoevaluarse con la rúbrica. El lint y el render se corren después en el repo.
