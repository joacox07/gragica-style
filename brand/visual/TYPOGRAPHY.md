# Tipografía

## Familias

| Rol | Familia | Pesos | Fuente / licencia | Dónde |
|---|---|---|---|---|
| **Voz editorial** | **Source Serif 4** (variable, ejes `wght` y `opsz`) | 600 (titulares), 400 italic (citas) | Google Fonts, OFL | Titulares de marketing, el remate, títulos de documentos, cifras destacadas, wordmark |
| **Texto e interfaz** | **Source Sans 3** (variable `wght`) | 400, 500, 600, 700 | Google Fonts, OFL; en el producto vía `@fontsource-variable/source-sans-3` | Todo lo demás |
| Código / IDs | `ui-monospace, SF Mono, Menlo` | — | sistema | Solo datos técnicos. No es tipografía de marca. |

Fallbacks:

```css
--font-serif: "Source Serif 4", Georgia, "Times New Roman", serif;
--font-sans:  "Source Sans 3", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
```

Por qué esta pareja: las dos son de Adobe (Frank Grießhammer / Paul D. Hunt), comparten métricas y ritmo, y son libres.
La serif trae el documento escolar (boletín, acta, libro de temas); la sans trae la pantalla. Ninguna es la
sans geométrica de todos los SaaS. **No se agregan tipografías invitadas, ni en campaña.**

En Canva: “Source Serif 4” y “Source Sans 3” están en la biblioteca; si no aparecen, subir los TTF de Google Fonts al
Brand Kit. En Google Slides están disponibles en “Más fuentes”.

## Comportamiento: cómo se compone Gragica

### 1. El remate (el gesto central)

- Titular en **Source Serif 4 Semibold**, alineado a la **izquierda**, en hasta tres líneas cortadas a mano por sentido (nunca por ancho).
- La última palabra o la última línea va en **verde Gragica** (`#5BAE66` sobre oscuro).
- Termina con **punto**, que también va en verde.
- El corte de línea se elige por sentido, no por ancho: «La gestión de tu colegio, / **entera.**»
- Nunca centrado salvo en lockup vertical, end card, portada 9:16 y certificados (ver Parámetros).

### 2. Eyebrow

Rótulo arriba del titular: Source Sans 3 Medium, **mayúsculas**, tracking `0.14em`, color verde, 12px en web.
Dice el tema en 2–4 palabras con interpunto: `GESTIÓN ESCOLAR · ARGENTINA`.

### 3. Bajada

Source Sans 3 Regular, interlineado 1,6 en web e impresión y 1,45–1,5 en formatos sociales, tinta secundaria, ≤ 58 caracteres por línea. Nunca en serif.

### 4. Cifras

- En datos, **Source Sans 3 con cifras tabulares** (`font-variant-numeric: tabular-nums`): las columnas alinean.
- Cifra protagonista de marketing (“87%”): Source Serif 4 Semibold, enorme, con su unidad en sans a 35 % del tamaño.
- Coma decimal, punto de miles: `7,6` · `1.200`.

### 5. Palabras destacadas

Solo dos maneras: **color verde** (el remate) o *serif itálica* para una cita. Nunca subrayado decorativo, nunca
resaltador amarillo, nunca negrita dentro de un titular serif, nunca mayúsculas en titulares.

### 6. Pies y captions

Source Sans 3, 13px en web (20–22px en formatos sociales y slides, ver Parámetros), tinta atenuada. El pie de evidencia (“Captura real · datos ficticios”) es una caption.

### 7. CTAs

Source Sans 3 Semibold, sentence case, 15–17px en web. Nunca en serif.

### 8. Puntuación como recurso

El **punto final** del titular es parte de la identidad (cierra, afirma). Las comillas latinas «» se usan en citas
también como gráfico: en un quote card, la « de apertura puede ir en serif verde a 3× el tamaño del texto.

## Producto (Nivel 1)

El producto ya tiene su escala en `packages/ui/src/styles/tokens.css` (7 pasos en `rem`, para respetar la escala de
fuente del sistema en Android). La marca no la cambia:

| Token | Tamaño | Interlineado | Peso | Uso |
|---|---|---|---|---|
| `text-display` | 1,75rem (28px) | 1,15 | 700 | Cifras protagonistas, saludo del Inicio |
| `text-title` | 1,5rem (24px) | 1,2 | 650 | Título de pantalla |
| `text-heading` | 1,125rem (18px) | 1,3 | 600 | Sección |
| `text-subheading` | 1rem | 1,35 | 600 | Título de tarjeta |
| `text-body` | 0,9375rem (15px) | 1,5 | 400 | Texto |
| `text-label` | 0,8125rem (13px) | 1,35 | 500 | Rótulos, botones chicos |
| `text-caption` | 0,75rem (12px) | 1,35 | 400 | Fechas, notas al pie |

Serif en producto: solo en momentos editoriales (saludo del Inicio, título de un comunicado o documento), nunca en
controles, tablas, menús ni formularios. *(Hoy el producto no carga Source Serif 4 en Tauri.)*

## ✅ / ❌

| ✅ | ❌ |
|---|---|
| Titular serif a la izquierda, dos líneas, remate verde con punto | Titular centrado en sans bold mayúscula |
| Una sola familia por rol | Mezclar Source Serif con Playfair o Montserrat |
| Cifras tabulares en tablas | Cifras proporcionales que bailan en columnas |
| `«Guardar»` | `"Guardar"` o `'Guardar'` |
| Eyebrow en mayúsculas espaciadas, chico | Titular entero en mayúsculas |
| Tracking negativo en display serif | Tracking positivo en titulares |

## Parámetros

```yaml
families:
  serif: "Source Serif 4"      # wght 600, opsz auto (display)
  sans: "Source Sans 3"
display_serif:
  weight: 600
  line_height: 1.04            # hero; 1.08 en títulos de sección
  letter_spacing_em: -0.025    # hero; -0.02 sección
  max_lines: 3
  align: left                  # center solo en lockup vertical, end card, portada 9:16, certificado
eyebrow: { size_px_web: 12, weight: 500, case: upper, letter_spacing_em: 0.14, color: brand.primary }
lead:    { line_height: { web_print: 1.6, social: [1.45, 1.5] }, max_chars_per_line: 58, color: text.secondary }
caption: { size_px_web: 13, line_height: 1.5, color: text.muted }
cta:     { weight: 600, size_px_web: [15, 17], case: sentence }
body_min: { screen_px: 15, print_pt: 9 }
web_marketing_px:              # clamp(min, fluid, max) de la landing actual
  hero_h1: [40, 80]
  section_h2: [32, 52]
  lead: [17, 20]
format_px:                     # canónico: skills/gragica-brand/references/brand-spec.json › formats
  ad-4x5:      { display: [96, 128], heading: [64, 80], lead: [34, 40], eyebrow: 22, caption: 20, figure: [200, 320], cta: 30 }
  post-1x1:    { display: [88, 112], heading: [56, 72], lead: [32, 36], eyebrow: 22, caption: 20, figure: [180, 280], cta: 28 }
  story-9x16:  { display: [104, 140], heading: [72, 88], lead: [38, 44], eyebrow: 24, caption: 22, figure: [240, 360], cta: 34 }
  slide-16x9:  { display: [96, 140], heading: [64, 88], lead: [36, 44], body: [30, 36], eyebrow: 22, caption: 22, figure: [200, 320], min_body: 28 }
  og-1200x630: { display: [72, 92], eyebrow: 20, caption: 20 }
  a4:          { px_96dpi: { display: [36, 44], heading: [22, 26], body: [13, 14], caption: [10, 11] }, pt: { display: 28, heading: 16, body: 10.5, caption: 8 } }
max_words_headline: { ad-4x5: 8, post-1x1: 7, story-9x16: 8, slide-16x9: 6, og-1200x630: 7, a4: 10 }
figures:
  data: { family: sans, variant: tabular-nums }
  hero_number: { family: serif, weight: 600, unit_ratio: 0.35 }
  decimal: ","
  thousands: "."
```
