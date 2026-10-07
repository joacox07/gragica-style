# Color

> Fuente canónica de los valores: `brand/tokens/*.tokens.json`, espejo verificado de `packages/ui/src/styles/tokens.css`
> y `packages/ui/src/lib/palette.ts`. Verificá con `node scripts/brand/check-tokens.mjs` (también imprime esta tabla con `--table`).

## La idea

Gragica se pinta con **cuatro colores de marca**: papel, tinta, verde y, de vez en cuando, dorado. Todo lo demás
(estados, gráficos, roles, materias) es **color funcional**: sirve para leer datos, no para decorar.

*Relato (para explicarlo, no para ilustrarlo):* el verde bosque es el pizarrón, el papel es la hoja, la tinta es la lapicera
y el dorado es la distinción (abanderados, cuadro de honor). Nunca se ilustra literalmente: nada de texturas de tiza
ni pizarrones dibujados.

## Arquitectura

```
Primitivos (qué color es)        →   Semánticos (para qué sirve)        →   Contexto
green.700  #2F6F2A                    color.brand.primary                    Producto · Marketing · Campaña
paper.050  #FCFDFC                    color.surface.page                     Dataviz · Co-branding
ink.900    #1F2023                    color.text.primary
…                                     …
```

- **Primitivos** (`primitive.tokens.json`): valores crudos con nombre de lo que son.
- **Semánticos** (`semantic.tokens.json`): lo que usan las piezas. *Una pieza nueva siempre referencia un semántico.*
- **Componentes**: no existen en la marca. Los tokens de componente del producto viven en `packages/ui` y no se duplican.

## Paleta de marca

| Rol | Token semántico | HEX | Cuándo | Cuándo NO |
|---|---|---|---|---|
| **Verde Gragica** | `color.brand.primary` | `#2F6F2A` | Remate, eyebrow, botón principal, isotipo, un dato destacado. | Fondos grandes en claro (usá verde noche), texto chico sobre verde noche. |
| **Verde profundo** | `color.brand.primary-strong` | `#1C5418` | Hover, titulares verdes muy grandes en campaña. | Como “segundo verde” de marca. |
| **Verde noche** | `color.brand.night` | `#0D1C0D` | Fondos oscuros de marketing: bandas, portadas, end cards. | Producto (salvo video), textos largos. |
| **Verde sobre noche** | `color.dark.primary` | `#5BAE66` | El remate cuando el fondo es verde noche u oscuro. | Sobre papel (le falta peso). |
| **Papel** | `color.surface.page` | `#FCFDFC` | Fondo por defecto de todo. | — |
| **Blanco** | `color.surface.raised` | `#FFFFFF` | Tarjetas, marcos de captura, hojas A4. | — |
| **Papel hundido** | `color.surface.sunken` | `#F3F7F2` | Secciones alternas, fondos de tabla. | — |
| **Filete** | `color.border.default` | `#E0E7DF` | Bordes de 1px, reglas, separadores. | Texto. |
| **Tinta** | `color.text.primary` | `#1F2023` | Titulares y texto. | — |
| **Tinta secundaria** | `color.text.secondary` | `#4E5156` | Bajadas. | — |
| **Tinta atenuada** | `color.text.muted` | `#61656B` | Pies, captions, metadatos. Es el gris más claro permitido para texto. | Texto largo. |
| **Dorado** | `color.brand.accent` | `#C98E18` | Distinción: sello, filete, ícono de logro, una cifra récord. **Uno por pieza.** | Texto sobre claro (usá `gold.700` `#8D6411`). |
| **Dorado sobre noche** | `color.brand.accent-on-night` | `#EAB448` | Acento sobre verde noche. | Sobre papel. |
| **Texto sobre noche** | `color.brand.on-night` | `#CAD8CA` | Bajadas sobre verde noche. | — |

### Proporciones por nivel

Son **máximos orientativos**, no cuotas: una pieza solo tipográfica puede tener menos verde, y el dorado es opcional.

| | Papel/blanco | Tinta | Verde | Dorado |
|---|---|---|---|---|
| Producto | 85 % | 12 % | 3 % | 0 % |
| Institucional | 80 % | 15 % | 5 % | ≤ 1 % |
| Marketing claro | 70 % | 15 % | 12 % | 3 % |
| Marketing oscuro | verde noche 75 % · texto claro 15 % · verde `#5BAE66` 7 % · dorado 3 % |

### Cómo conviven dos colores

- **Verde + dorado:** nunca adyacentes en un mismo bloque. El dorado acompaña al verde desde lejos (un sello en la
  esquina, un filete), no compite en el titular. También en gráficos: no van uno al lado del otro (daltonismo).
- **Verde + color del colegio:** el color del colegio manda en su territorio (login, membrete, sitio). Gragica aparece
  en su versión blanca o tinta, nunca verde sobre el color del colegio.
- **Verde + rojo:** solo como semáforo de datos (aprobado/desaprobado), nunca decorativo.
- **Azul:** no es un color de Gragica. Solo aparece cuando es del colegio o en la serie de materias del producto.

## Color funcional

### Estados

| Estado | Relleno | Texto | Fondo tenue | Significado en un colegio |
|---|---|---|---|---|
| Éxito | `#239F50` | `#1C7D3F` | `#E8F7EE` | presente, entregado, destacado (en notas, solo ≥ 9: ver [DATA_VISUALIZATION](DATA_VISUALIZATION.md#semáforo-de-rendimiento)) |
| Advertencia | `#EB8D0A` | `#9D5E07` | `#FDF0DD` | en riesgo, tarde, pendiente |
| Error | `#DE2E21` | `#CC2A1E` | `#FBEBE9` | desaprobado, ausente, error |
| Información | `#218D97` | `#1C7982` | `#E4F5F6` | aviso neutro (teal, **no** azul) |

Regla del producto (quinteto): cada estado tiene relleno, `-muted`, `-on-muted`, `-foreground` y `-hover`, con contraste
medido en `tokens.test.ts`. En piezas de marca se usan solo **texto** y **fondo tenue**.

### IA

`color.ai.*` (grafito `#2E3842` → verde metálico `#2F745F`) es fijo en todos los colegios y es **el único degradado
permitido en producto**: marca que algo lo hizo o lo sugiere la IA. En marketing no se usa como decoración.

### Gragi (excepción declarada)

El robot tiene sus propios verdes, medidos en `brand/assets/gragi/gragi.webp`: cuerpo `#089A33`, neón `#36C251`.
**Viven solo dentro del personaje.** Nunca como texto, fondo, botón ni color de gráfico. La interfaz del asistente usa
`gragi.500`/`gragi.800` (`#299952` → `#155B18`).

### Gráficos

Un gráfico de **una sola serie** va en verde de gráfico `#2F752A` (o en tinta si el dato es neutro). Serie categórica en orden fijo: verde `#2F752A` · teal `#08919C` · terracota `#C96134` · ciruela `#855AAF` · dorado `#C3890E`.
Detalle y reglas en [DATA_VISUALIZATION](DATA_VISUALIZATION.md).

### Color del colegio

El colegio elige un color en el editor de su sitio (`ColorSwatches`: luminosidad 18–48 %, saturación ≥ 45 %).
El sistema deriva de ese color el tono de los neutros y el primario de su app (`packages/core/src/color.ts`). En piezas de
Gragica sobre un colegio, ese color se usa tal cual lo eligió el colegio, nunca “corregido” hacia el verde.

## Accesibilidad

Pares verificados por `check-tokens.mjs` (WCAG 2.x):

| Texto | Fondo | Contraste | Mínimo |
|---|---|---|---|
| Tinta `#1F2023` | Papel | 15,98:1 | 4,5 |
| Tinta secundaria | Papel | 7,82:1 | 4,5 |
| Tinta atenuada | Blanco | 5,86:1 | 4,5 |
| Verde Gragica | Papel | 6,01:1 | 4,5 |
| Blanco | Verde Gragica | 6,13:1 | 4,5 |
| Texto sobre noche `#CAD8CA` | Verde noche | 11,93:1 | 4,5 |
| Dorado sobre noche `#EAB448` | Verde noche | 9,35:1 | 4,5 |
| Verde `#5BAE66` | Verde noche | 6,47:1 | 4,5 |
| Dorado texto `#8D6411` | Papel | 5,20:1 | 4,5 |

**Pares prohibidos:**

| Combinación | Contraste | En su lugar |
|---|---|---|
| Verde Gragica `#2F6F2A` sobre verde noche | 2,88:1 | `#5BAE66` |
| Dorado `#C98E18` como texto o ícono informativo sobre papel | 2,80:1 | `#8D6411`, o dorado solo decorativo |
| Neón de Gragi como texto | 2,29:1 | nunca |
| Ámbar de relleno como texto | 2,52:1 | `#9D5E07` |

Nunca se comunica solo con color: aprobado/desaprobado lleva además el número, y los estados llevan ícono o texto.

## Impresión

- Los valores CMYK de la tabla son **conversiones aproximadas sin perfil**. Para imprenta, pedir prueba de color sobre el
  papel real y ajustar al perfil del proveedor (en Argentina suele ser FOGRA39 o el propio de la imprenta).
- Verde Gragica de referencia para imprenta: **C 75 · M 20 · Y 100 · K 25** como punto de partida, a validar con prueba.
  *[Recomendación: si se imprime seguido, definir un Pantone con una prueba física; no se puede elegir de pantalla.]*
- Papel blanco: el “papel” `#FCFDFC` no se imprime; es el blanco del soporte.

## Tabla completa de primitivos

| Token | HEX | RGB | HSL | OKLCH | CMYK aprox. | Uso |
|---|---|---|---|---|---|---|
| `green.400` | `#5BAE66` | 91, 174, 102 | hsl(128 34% 52%) | oklch(68.0% 0.132 147) | 48/0/41/32 | Verde de marca sobre fondo oscuro. |
| `green.700` | `#2F6F2A` | 47, 111, 42 | hsl(116 45% 30%) | oklch(48.3% 0.122 142) | 58/0/62/56 | VERDE GRAGICA. El color canónico de la marca. |
| `green.800` | `#1C5418` | 28, 84, 24 | hsl(116 56% 21%) | oklch(39.5% 0.108 142) | 67/0/71/67 | Verde bosque profundo. Hover del primario. |
| `green.900` | `#1B321A` | 27, 50, 26 | hsl(118 32% 15%) | oklch(29.1% 0.052 143) | 46/0/48/80 | Fondo del CTA final de la landing. |
| `green.950` | `#0D1C0D` | 13, 28, 13 | hsl(120 35% 8%) | oklch(20.8% 0.036 144) | 54/0/54/89 | Verde noche. Bandas oscuras de marketing. |
| `paper.100` | `#F3F7F2` | 243, 247, 242 | hsl(116 25% 96%) | oklch(97.2% 0.008 139) | 2/0/2/3 | Papel hundido. Zonas atenuadas, sidebar. |
| `paper.200` | `#E0E7DF` | 224, 231, 223 | hsl(116 14% 89%) | oklch(92.0% 0.013 142) | 3/0/3/9 | Filete. Bordes y separadores. |
| `paper.000` | `#FFFFFF` | 255, 255, 255 | — | oklch(100.0% 0.000 0) | 0/0/0/0 | Blanco. Superficie de tarjetas y papel de impresión. |
| `paper.050` | `#FCFDFC` | 252, 253, 252 | hsl(116 25% 99%) | oklch(99.3% 0.002 0) | 0/0/0/1 | Papel. Fondo de página (teñido con el tono de marca). |
| `ink.600` | `#61656B` | 97, 101, 107 | hsl(213 5% 40%) | oklch(50.5% 0.011 258) | 9/6/0/58 | Tinta atenuada. Mínimo para texto chico (AA). |
| `ink.700` | `#4E5156` | 78, 81, 86 | hsl(213 5% 32%) | oklch(43.4% 0.009 261) | 9/6/0/66 | Tinta secundaria. |
| `ink.900` | `#1F2023` | 31, 32, 35 | hsl(225 6% 13%) | oklch(24.4% 0.006 271) | 11/9/0/86 | Tinta. Texto principal. |
| `night.100` | `#E6EAE6` | 230, 234, 230 | hsl(116 8% 91%) | oklch(93.3% 0.007 146) | 2/0/2/8 | Texto principal en tema oscuro. |
| `night.800` | `#1D201D` | 29, 32, 29 | hsl(116 5% 12%) | oklch(23.9% 0.007 145) | 9/0/9/87 | Superficie en tema oscuro. |
| `night.900` | `#161816` | 22, 24, 22 | hsl(116 6% 9%) | oklch(20.6% 0.005 145) | 8/0/8/91 | Página en tema oscuro. |
| `gold.100` | `#F9EFDC` | 249, 239, 220 | hsl(40 70% 92%) | oklch(95.5% 0.027 84) | 0/4/12/2 | Dorado tenue de fondo. |
| `gold.300` | `#EAB448` | 234, 180, 72 | hsl(40 79% 60%) | oklch(80.0% 0.137 82) | 0/23/69/8 | Dorado sobre verde noche. |
| `gold.500` | `#C98E18` | 201, 142, 24 | hsl(40 79% 44%) | oklch(68.8% 0.138 78) | 0/29/88/21 | Dorado. Distinción: lo destacado, lo logrado. |
| `gold.700` | `#8D6411` | 141, 100, 17 | hsl(40 79% 31%) | oklch(53.3% 0.105 79) | 0/29/88/45 | Dorado como texto sobre fondo claro. |
| `emerald.600` | `#239F50` | 35, 159, 80 | hsl(142 64% 38%) | oklch(61.9% 0.157 150) | 78/0/50/38 | Éxito, aprobado, presente. |
| `emerald.700` | `#1C7D3F` | 28, 125, 63 | hsl(142 64% 30%) | oklch(52.0% 0.129 151) | 78/0/50/51 | Éxito como texto. |
| `emerald.050` | `#E8F7EE` | 232, 247, 238 | hsl(142 50% 94%) | oklch(96.3% 0.020 160) | 6/0/4/3 | Éxito de fondo. |
| `amber.500` | `#EB8D0A` | 235, 141, 10 | hsl(35 92% 48%) | oklch(72.7% 0.162 64) | 0/40/96/8 | Advertencia, en riesgo. |
| `amber.700` | `#9D5E07` | 157, 94, 7 | hsl(35 92% 32%) | oklch(54.1% 0.119 65) | 0/40/96/38 | Advertencia como texto. |
| `amber.050` | `#FDF0DD` | 253, 240, 221 | hsl(35 90% 93%) | oklch(96.0% 0.029 78) | 0/5/13/1 | Advertencia de fondo. |
| `red.500` | `#DE2E21` | 222, 46, 33 | hsl(4 74% 50%) | oklch(58.6% 0.213 29) | 0/79/85/13 | Error, desaprobado, ausente, acción destructiva. |
| `red.600` | `#CC2A1E` | 204, 42, 30 | hsl(4 74% 46%) | oklch(55.0% 0.199 29) | 0/79/85/20 | Error como texto. |
| `red.050` | `#FBEBE9` | 251, 235, 233 | hsl(4 70% 95%) | oklch(95.2% 0.018 26) | 0/6/7/2 | Error de fondo. |
| `teal.600` | `#218D97` | 33, 141, 151 | hsl(185 64% 36%) | oklch(59.0% 0.093 204) | 78/7/0/41 | Información (no es azul a propósito). |
| `teal.700` | `#1C7982` | 28, 121, 130 | hsl(185 64% 31%) | oklch(52.9% 0.083 205) | 78/7/0/49 | Información como texto. |
| `teal.050` | `#E4F5F6` | 228, 245, 246 | hsl(185 50% 93%) | oklch(95.8% 0.018 201) | 7/0/0/4 | Información de fondo. |
| `graphite.800` | `#2E3842` | 46, 56, 66 | hsl(210 18% 22%) | oklch(33.6% 0.022 248) | 30/15/0/74 | Grafito. Inicio del degradado de IA. |
| `aiteal.600` | `#2F745F` | 47, 116, 95 | hsl(162 42% 32%) | oklch(50.9% 0.078 170) | 59/0/18/55 | Verde metálico. Fin del degradado de IA. |
| `aiteal.700` | `#256A55` | 37, 106, 85 | hsl(162 48% 28%) | oklch(47.5% 0.077 170) | 65/0/20/58 | Texto de IA. |
| `gragi.500` | `#299952` | 41, 153, 82 | hsl(142 58% 38%) | oklch(60.4% 0.145 151) | 73/0/46/40 | Esmeralda de Gragi (UI del asistente). |
| `gragi.800` | `#155B18` | 21, 91, 24 | hsl(122 62% 22%) | oklch(41.4% 0.121 144) | 77/0/74/64 | Bosque de Gragi (UI del asistente). |
| `gragi.neon` | `#36C251` | 54, 194, 81 | — | oklch(71.7% 0.194 146) | 72/0/58/24 | Verde neón del robot Gragi (medido en images/gragi/gragi.webp). EXCEPCIÓN: solo existe dentro del personaje; nunca como color de texto, fondo o UI. |
| `gragi.body` | `#089A33` | 8, 154, 51 | — | oklch(59.8% 0.180 146) | 95/0/67/40 | Verde del cuerpo del robot (medido). Misma excepción. |
| `chart.light.1` | `#2F752A` | 47, 117, 42 | — | oklch(50.0% 0.130 142) | 60/0/64/54 | Serie 1, verde bosque. |
| `chart.light.2` | `#08919C` | 8, 145, 156 | — | oklch(59.9% 0.101 204) | 95/7/0/39 | Serie 2, teal. |
| `chart.light.3` | `#C96134` | 201, 97, 52 | — | oklch(61.1% 0.145 43) | 0/52/74/21 | Serie 3, terracota. |
| `chart.light.4` | `#855AAF` | 133, 90, 175 | — | oklch(55.0% 0.134 306) | 24/49/0/31 | Serie 4, ciruela. |
| `chart.light.5` | `#C3890E` | 195, 137, 14 | — | oklch(67.1% 0.137 78) | 0/30/93/24 | Serie 5, dorado. |
| `chart.dark.1` | `#3BAA34` | 59, 170, 52 | — | oklch(65.1% 0.185 142) | 65/0/69/33 | Serie 1 en oscuro. |
| `chart.dark.2` | `#13A2AE` | 19, 162, 174 | — | oklch(65.1% 0.108 204) | 89/7/0/32 | Serie 2 en oscuro. |
| `chart.dark.3` | `#D27147` | 210, 113, 71 | — | oklch(65.1% 0.135 43) | 0/46/66/18 | Serie 3 en oscuro. |
| `chart.dark.4` | `#9D72C9` | 157, 114, 201 | — | oklch(63.0% 0.134 306) | 22/43/0/21 | Serie 4 en oscuro. |
| `chart.dark.5` | `#BB8400` | 187, 132, 0 | — | oklch(65.1% 0.135 79) | 0/29/100/27 | Serie 5 en oscuro. |

_Tabla generada con `node scripts/brand/check-tokens.mjs --table`. OKLCH calculado desde sRGB; CMYK naïf sin perfil._

## Parámetros

```yaml
brand:
  primary: "#2F6F2A"
  primary_strong: "#1C5418"
  primary_on_dark: "#5BAE66"
  night: "#0D1C0D"
  on_night: "#CAD8CA"
  accent: "#C98E18"
  accent_text: "#8D6411"
  accent_on_night: "#EAB448"
surface: { page: "#FCFDFC", raised: "#FFFFFF", sunken: "#F3F7F2", border: "#E0E7DF" }
text: { primary: "#1F2023", secondary: "#4E5156", muted: "#61656B" }
status:
  success: { fill: "#239F50", text: "#1C7D3F", bg: "#E8F7EE" }
  warning: { fill: "#EB8D0A", text: "#9D5E07", bg: "#FDF0DD" }
  error:   { fill: "#DE2E21", text: "#CC2A1E", bg: "#FBEBE9" }
  info:    { fill: "#218D97", text: "#1C7982", bg: "#E4F5F6" }
proportions_pct:            # papel/blanco, tinta, verde, dorado
  product: [85, 12, 3, 0]
  institutional: [80, 15, 5, 1]
  marketing_light: [70, 15, 12, 3]
  marketing_dark: { night: 75, light_text: 15, green_on_dark: 7, gold: 3 }
gold_max_per_piece: 1
night_max_ratio_in_series: 0.34
min_contrast: { text: 4.5, large_text_or_graphic: 3.0 }
forbidden_pairs:
  - ["#2F6F2A", "#0D1C0D"]
  - ["#C98E18", "#FCFDFC"]    # como texto/ícono informativo
  - ["#36C251", "#FCFDFC"]
  - ["#EB8D0A", "#FFFFFF"]    # como texto
gradients: { allowed: [ai_surface_in_product], marketing: false }
blue: school_only
print_reference_cmyk_primary: [75, 20, 100, 25]   # punto de partida, validar con prueba física
```
