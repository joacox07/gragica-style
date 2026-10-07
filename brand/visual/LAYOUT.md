# Composición y layout

## Principios

1. **Alineado a la izquierda, sobre una línea.** El titular, la bajada y el CTA cuelgan del mismo margen izquierdo.
   La alineación a la izquierda es la de un documento escrito; el centrado es de invitación de casamiento.
2. **Una idea por pieza, una zona densa por pieza.** Si hay captura, el texto es corto. Si el texto es largo, no hay captura.
3. **El aire es un material.** En marketing, al menos 40 % de la superficie queda vacía.
4. **Filetes en vez de cajas.** Para separar, una línea de 1px (`#E0E7DF`) antes que una tarjeta con sombra.
   La landing ya lo hace: la lista de funciones cuelga de una regla vertical.
5. **Bloques rectos.** Radios solo en lo que es objeto (tarjeta, captura, botón): 10–14px. Los fondos, bandas y
   bloques de color son rectángulos a sangre, sin redondear.
6. **Pocas tarjetas.** Una tarjeta es para algo que se toca o se lee por separado. Tres tarjetas iguales en fila es
   un template de SaaS: preferir una lista con filetes.

## Retícula

Unidad base **8px** (en impresión, 2 mm). Todo margen, gutter y separación es múltiplo de la unidad.

| Superficie | Columnas | Margen exterior | Gutter | Ancho máximo |
|---|---|---|---|---|
| Web marketing escritorio | 12 | 40px (24px < 768px) | 24px | contenido 1120px |
| Web mobile | 4 | 24px (mín. 16px, contrato responsive R4) | 16px | — |
| Producto | definido por `packages/ui` (container 1200px, gutter 16/24) | | | |
| Anuncio 4:5 (1080×1350) | 6 | 88px laterales, 96 arriba, 88 abajo | 24px | — |
| Post 1:1 (1080×1080) | 6 | 80px | 24px | — |
| Story / Reel 9:16 (1080×1920) | 4 | 72px laterales; 250 arriba y 340 abajo libres | 24px | — |
| Slide 16:9 (1920×1080) | 12 | 120px laterales, 96px arriba/abajo | 32px | — |
| A4 (210×297 mm) | 6 | 20 mm (25 mm izquierdo si se anilla) | 5 mm | — |
| OG (1200×630) | 6 | 72px laterales, 64 arriba/abajo | 24px | — |

## Estructuras base (gramática)

Cuatro estructuras sirven para casi todo. Se combinan con los activos de [DISTINCTIVE_ASSETS](DISTINCTIVE_ASSETS.md).

| Estructura | Esquema | Para |
|---|---|---|
| **A · Afirmación** | eyebrow arriba, titular grande en el tercio medio, logo abajo | awareness, lanzamiento, quote |
| **B · Afirmación + evidencia** | titular arriba (40 %), captura en marco abajo, sangrando por el borde inferior o derecho | feature, producto, demo |
| **C · Dato** | cifra enorme, una línea que la explica, fuente al pie | dato, seguridad, caso |
| **D · Documento** | membrete, título serif, cuerpo en columnas con filetes | institucional, propuesta, informe |

## Relación texto / imagen

- La captura **sangra** por un borde (abajo o a la derecha) cuando la pieza es de marketing: se ve que hay más producto.
- La captura nunca se superpone al titular.
- Recorte: mostrar **una tarea**, no la pantalla entera. Una captura de 1080px de ancho muestra una tabla de 6 filas,
  no 20.
- Captura de teléfono: se muestra como pantalla, con radio 28px y filete, **sin** carcasa de dispositivo dibujada.

## Fondos permitidos

| Fondo | Uso |
|---|---|
| Papel `#FCFDFC` | Por defecto |
| Papel hundido `#F3F7F2` | Pieza alterna en una serie, sección |
| Blanco | Documentos, impresión |
| Verde noche `#0D1C0D` | Marketing oscuro (≤ 1 de cada 3 piezas de una serie) |
| Verde Gragica `#2F6F2A` a sangre | Solo campaña o portada |
| Foto | Cuando haya fotografía propia ([PHOTOGRAPHY](PHOTOGRAPHY.md)) |

Prohibido: degradados de fondo, ruido/grano decorativo, malla de puntos, glow, vidrio esmerilado, blobs.

## Responsive

Contrato del producto (`docs/CONTRATO-RESPONSIVE.md`): piso 375px, gutter 16px, sin scroll horizontal, área táctil
44×44, por encima de 1440px el contenido se centra. La web de marketing hereda esas reglas.

## Parámetros

```yaml
base_unit_px: 8
print_base_unit_mm: 2
whitespace_min_ratio_marketing: 0.40
max_dense_zones_per_piece: 1
max_cards_in_row: 2            # 3+ tarjetas iguales en fila → usar lista con filetes
radius_px: { control: 10, card: 14, sheet: 20, screenshot: 14, phone_screenshot: 28, background_blocks: 0 }
rule_px: 1
formats:                       # canónico: brand-spec.json › formats (márgenes y zonas seguras en px)
  ad-4x5:      { w: 1080, h: 1350, margin: { x: 88, top: 96, bottom: 88 }, cols: 6, gutter: 24, logo: { version: lockup-h, width_px: [200, 240] } }
  post-1x1:    { w: 1080, h: 1080, margin: { x: 80, top: 80, bottom: 80 }, cols: 6, gutter: 24, logo: { version: lockup-h, width_px: [180, 220] } }
  story-9x16:  { w: 1080, h: 1920, margin: { x: 72, top: 250, bottom: 340 }, cols: 4, gutter: 24, logo: { version: lockup-h, width_px: [220, 260], position: top-left-inside-safe } }
  reel-9x16:   { w: 1080, h: 1920, margin: { x: 72, top: 220, bottom: 420 }, safe_right: 160 }
  slide-16x9:  { w: 1920, h: 1080, margin: { x: 120, top: 96, bottom: 96 }, cols: 12, gutter: 32, logo: { version: mark, width_px: [40, 48], cover: "lockup-h 320px" } }
  og-1200x630: { w: 1200, h: 630, margin: { x: 72, top: 64, bottom: 64 }, cols: 6, gutter: 24, logo: { version: lockup-h, width_px: [200, 220], position: top-left } }
  a4:          { w_px_96dpi: 794, h_px_96dpi: 1123, margin_px: 76, margin_mm: 20, margin_binding_mm: 25, bleed_mm: 3, safe_mm: 5, dpi_print: 300, cols: 6, gutter_px: 16, logo: { version: lockup-h-ink-word, width_px: [120, 140] } }
  web_marketing: { content_max: 1120, margin_desktop: 40, margin_mobile: 24, cols_desktop: 12, cols_mobile: 4 }
screenshot:
  min_share_of_canvas: 0.35
  max_share_of_canvas: 0.65
  bleed_edges: [bottom, right]  # uno de los dos
  max_table_rows_visible: 8
```
