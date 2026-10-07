# Logo

## Estado (2026-10-07)

| | Antes (en producción, no se toca) | Ahora (sistema de marca 1.0) |
|---|---|---|
| Isotipo | PNG 512px, `#227C57`, `front/public/images/logo-gragica-mark.png` | **SVG** de 30 nodos, `#2F6F2A`: `brand/assets/logos/gragica-mark.svg` |
| Wordmark | PNG, sans redondeada sin familia, `#2F7932` | **Source Serif 4 Semibold** en curvas: `gragica-wordmark.svg` |
| Lockup | No existía como archivo (la landing lo compone en HTML con la G + texto serif) | `gragica-lockup-h.svg`, `gragica-lockup-v.svg` |
| Ícono de app | PNG, G blanca sobre `#306D29` | `gragica-app-icon.svg` (G blanca sobre `#2F6F2A`) |

Los archivos nuevos son la **referencia** para toda pieza nueva. La web y la app siguen usando los PNG hasta que se apruebe
reemplazarlos. El isotipo nuevo es un trazado fiel del original (≈ 4 % de píxeles distintos a 600px,
casi todo antialiasing), no un rediseño: la silueta que la gente ya reconoce no cambia.

Se regeneran con `scripts/brand/build_logo.py` (ver el encabezado del script).

## Anatomía

**La G** es un anillo abierto arriba a la derecha, cruzado por un **corte diagonal** que entra desde la derecha y
termina en un **remate en punta** abajo, como un trazo de lapicera que cierra la letra. Leída rápido es una G;
mirada de cerca, la diagonal sugiere movimiento hacia adelante y el remate, la firma.

**El wordmark** es “Gragica” en Source Serif 4 Semibold, tamaño óptico display, con el kerning de la fuente y un
tracking de −0,5 %. Es la misma tipografía de los titulares: el nombre está escrito con la voz de la marca.

## Versiones

| Archivo | Uso |
|---|---|
| `gragica-lockup-h.svg` | **Principal.** Encabezados, web, firmas, documentos, slides. |
| `gragica-lockup-h-ink-word.svg` | G verde + palabra en tinta. Documentos institucionales donde el verde debe ser mínimo. |
| `gragica-lockup-h-white.svg` | Todo blanco, sobre verde Gragica, verde noche o fotografía oscura. |
| `gragica-lockup-h-ink.svg` | Una tinta (`#1F2023`). Fax, sellos, impresión a un color, grabado. |
| `gragica-lockup-v.svg` / `-white` | Vertical, para formatos cuadrados o altos con mucho aire (portadas, end cards, stands). |
| `gragica-mark.svg` / `-ink` / `-white` | Isotipo solo: favicon, avatar, app icon, marca de agua, cuando el nombre ya está escrito cerca. |
| `gragica-wordmark.svg` | Palabra sola. Sólo cuando la G ya aparece en la misma pieza (por ejemplo, Gragi lleva la G en el pecho). |
| `gragica-app-icon.svg` | Ícono de app, avatar de redes, favicon con fondo. |
| `png/` | Exportaciones listas (512/1024/1600px) para Canva, Slides y redes. |

## Construcción del lockup horizontal

Unidad **u** = altura de mayúscula del wordmark (la altura de la “G” de Gragica).

```
 ┌──────┐            ┌─ altura de G del wordmark = 1u
 │  G   │ ← 0,42u →  Gragica
 │ 1,42u│
 └──────┘
```

- La G mide **1,42u** de alto y se centra ópticamente con las mayúsculas.
- Separación G → palabra: **0,42u**.
- Proporción total ≈ **4 : 1** (639,66 × 158,76 en el SVG).

## Zona de resguardo

- **Lockup:** 1u libre en los cuatro lados. Nada (texto, borde, otro logo, borde de la pieza) entra ahí.
- **Isotipo solo:** 25 % de su alto en los cuatro lados.
- En co-branding, la zona de resguardo se duplica hacia el lado del logo del colegio ([COBRANDING](../applications/COBRANDING.md)).

## Tamaños mínimos

| Versión | Pantalla | Impresión |
|---|---|---|
| Lockup horizontal | 100px de ancho | 25 mm de ancho |
| Lockup vertical | 64px de ancho | 16 mm |
| Isotipo | 16px (favicon) | 5 mm |
| Wordmark solo | 72px de ancho | 18 mm |

Por debajo de 100px de ancho se usa el **isotipo solo**.

## Color

| Fondo | Versión |
|---|---|
| Papel, blanco, gris muy claro | Verde (`gragica-lockup-h.svg`) |
| Verde Gragica `#2F6F2A` o verde noche `#0D1C0D` | Blanco |
| Fotografía | Blanco sobre zona oscura y sin detalle; si no hay zona tranquila, no va sobre la foto: va en una banda |
| Color del colegio | Blanco, si el contraste contra ese color es ≥ 3:1; si no, en una banda papel |
| Impresión a una tinta | Tinta o blanco calado |

**Nunca** el verde neón de Gragi, nunca degradado, nunca el turquesa viejo `#227C57`.

## Usos incorrectos

| ❌ | Por qué |
|---|---|
| Recolorear la G en otro verde, en el color del colegio o en degradado | El verde es parte del logo. |
| Estirar, comprimir, rotar o inclinar | Rompe la silueta. |
| Contorno, sombra, brillo, bisel, 3D, vidrio | Prohibido el efecto; ver [PRINCIPLES](../foundation/PRINCIPLES.md#4-sobriedad-con-carácter). |
| Reescribir “Gragica” con otra fuente (la sans redondeada vieja, Noto Sans, Inter) | El wordmark es un archivo, no un texto. |
| Cambiar la proporción G/palabra o la separación | Usá los archivos. |
| Poner la G dentro de un círculo o cuadrado que no sea el app icon | El app icon ya es la versión con fondo. |
| Usar la G como letra dentro de una palabra (“**G**estión”) | Es un logo, no una tipografía. |
| Usar el PNG viejo en piezas nuevas | Ver tabla de estado. |
| Logo sobre foto con mucho detalle | Pierde lectura. |

## Favicon, app icon y avatares

| Destino | Archivo | Nota |
|---|---|---|
| Favicon (16/32px) | `gragica-mark.svg` o `gragica-app-icon.svg` | En 16px, preferir el app icon: el fondo verde ayuda. |
| App icon (iOS/Android/escritorio) | `gragica-app-icon.svg` | La G ocupa el 62 % del lado (igual que el ícono actual). Android adaptativo: G blanca sobre `#2F6F2A`. |
| Avatar de redes (Instagram, LinkedIn, WhatsApp) | `png/gragica-app-icon-1024.png` | Ver recorte circular: la G no toca el borde. |
| Monocromo de notificación Android | `gragica-mark-white.svg` | |

## Animación

Ver [MOTION § Logo](MOTION.md#logo).

## Parámetros

```yaml
files_dir: brand/assets/logos
primary: gragica-lockup-h.svg
unit_u: wordmark_cap_height
lockup_h: { mark_height_u: 1.42, gap_u: 0.42, aspect_w_h: 4.03, viewbox: [639.66, 158.76] }
clearspace: { lockup_u: 1.0, mark_ratio_of_height: 0.25, cobranding_multiplier: 2 }
min_size:
  lockup_h: { px: 100, mm: 25 }
  lockup_v: { px: 64, mm: 16 }
  mark: { px: 16, mm: 5 }
  wordmark: { px: 72, mm: 18 }
below_lockup_min_use: mark
app_icon: { mark_ratio_of_side: 0.62, background: "#2F6F2A", mark: "#FFFFFF" }
colors_allowed: ["#2F6F2A", "#FFFFFF", "#1F2023"]
colors_forbidden: ["#227C57", "#2F7932", "#306D29", "#36C251", gradient]
wordmark_font: { family: "Source Serif 4", weight: 600, opsz: 60, tracking_em: -0.005 }
```
