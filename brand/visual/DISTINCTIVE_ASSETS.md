# Activos distintivos

Lo que hace que una pieza se reconozca como Gragica **antes de ver el logo**. No son decoración: cada uno sale de
algo que Gragica ya es. Estado: los activos 1–5 ya existen en la landing o en el producto; el 6 está **en exploración**.

## 1. El remate

**Qué es:** el titular en Source Serif 4 que cierra con su palabra final en verde y un punto.
«La gestión de tu colegio, **entera.**» · «Esto no es una **maqueta.**» · «Preguntale **al colegio.**»

**Por qué es nuestro:** la serif es documento; el punto afirma; el verde subraya sin subrayar. Ningún competidor de
software escolar escribe así.

**Reglas:** ver [TYPOGRAPHY § El remate](TYPOGRAPHY.md#1-el-remate-el-gesto-central). Una vez por pieza.

| ✅ | ❌ |
|---|---|
| El remate es la palabra que da el sentido | Pintar de verde una palabra al azar |
| Una sola zona verde en el titular | Dos o tres palabras verdes salteadas |
| Punto final verde | Signo de exclamación |

## 2. La evidencia a la vista

**Qué es:** la honestidad convertida en recurso gráfico. Toda captura lleva su pie; toda cifra, su fuente.

```
[captura]
Captura real de Gragica · colegio de demostración, datos ficticios.
```

```
87%
de asistencia promedio en 5° B este trimestre.
Fuente: Gragica, colegio de demostración.
```

**Reglas:** pie en caption (13px web; 20px en 4:5 y 1:1; 22px en stories y slides), tinta atenuada, alineado a la izquierda con la
captura. Si la cifra es de un cliente real, dice el colegio y tiene su permiso.

## 3. El marco

**Qué es:** el producto se muestra **tal cual**, dentro de un marco liso: blanco, radio 14px, filete 1px `#E0E7DF` y,
como máximo, la sombra de tarjeta del producto (`0 1px 2px rgb(0 0 0/.04)`). Sin barra de navegador falsa, sin
carcasa de teléfono, sin perspectiva, sin reflejos.

**Por qué es nuestro:** “Esto no es una maqueta” también se dice visualmente. Y es una metáfora del co-branding:
el colegio es el cuadro, Gragica es el marco.

| ✅ | ❌ |
|---|---|
| Captura plana, recortada a una tarea, sangrando por un borde | Laptop flotando en 3D con sombra larga |
| Captura de teléfono con radio 28px y filete | Mockup de iPhone dibujado |
| Datos de demo prolijos (tildes, fechas bien escritas) | “Martes, 8 De Septiembre · Ciclo lectivo Ciclo Lectivo 2026” |
| Una captura por pieza | Collage de 5 pantallas inclinadas |

**Antes de capturar:** revisar la demo (tildes en materias, nombres verosímiles, fechas en minúscula).

## 4. El lenguaje del documento escolar

**Qué es:** el colegio argentino vive en papeles: boletín, planilla, acta, cuaderno de comunicados, libro de temas.
Gragica los reemplaza y toma de ellos su gramática:

- **Filetes** finos que ordenan, en lugar de cajas.
- **Cifras tabulares** en columnas, como una planilla.
- **Membrete:** nombre del colegio arriba, datos en una línea con interpunto.
- **El acuse:** el “notificado ✓” del cuaderno de comunicados → un tilde verde pequeño con fecha y hora (único uso de ✓ fuera del producto).
- **Numeración** de secciones con números arábigos en serif: `1.` `2.` `3.`

**Límite (cliché):** nada de hojas rayadas dibujadas, texturas de papel arrugado, cuadernos con espiral, tiza,
pizarrones, manzanas o lápices. Es una gramática, no una ilustración.

## 5. Los datos como titular

**Qué es:** una cifra real del colegio, enorme, con su color semántico, como pieza principal. El dashboard del
director ya lo hace (“Aprobación 69%”, “Asistencia 87%”).

**Reglas:** una cifra por pieza; Source Serif 4 Semibold; unidad en sans al 35 %; explicación de una línea;
fuente al pie. El color de la cifra es semántico (verde = bien, ámbar = atención) o tinta si es neutra.

## 6. La diagonal de la G *(en exploración — no usar en producción)*

**Hipótesis:** el corte diagonal de la G (≈ 25° sobre la horizontal) podría usarse como ángulo de recorte de
capturas, como barrido en transiciones de video o como dirección de una flecha. **Sólo se adopta si al probarlo
en 4:5, 9:16 y una transición no parece un recurso agregado.** Hasta entonces, no aparece en piezas.

## Lo que NO es activo de Gragica

Degradados, vidrio esmerilado, blobs, patrones de puntos, ilustraciones isométricas, personajes planos de SaaS,
emojis, íconos 3D, grano decorativo. Si alguien propone uno, la carga de la prueba es suya:
tiene que explicar por qué es específico de Gragica.

## Gramática: cómo se combinan

Una pieza de marketing combina **una estructura** ([LAYOUT](LAYOUT.md#estructuras-base-gramática)) con
**uno a tres activos** (uno solo, el remate, alcanza para awareness):

| Pieza | Estructura | Activos |
|---|---|---|
| Lanzamiento de función | B | remate + marco + evidencia |
| Dato de seguridad | C | dato + evidencia + documento (filetes) |
| Awareness | A | remate (solo) sobre verde noche |
| Quote de un colegio real | A | remate en itálica + evidencia (nombre, cargo, colegio) |
| Propuesta comercial | D | documento + remate en portada |
| Carrusel educativo | A → B → C | remate en la tapa, documento en el medio, dato al final |

**Variedad sin perder ADN:** se puede variar el fondo (papel/hundido/noche), el borde por el que sangra la captura,
la escala del titular (dentro del rango), el recorte y la estructura. No se varía la familia tipográfica, el verde,
la alineación a la izquierda ni el pie de evidencia.

## Parámetros

```yaml
remate:
  max_per_piece: 1
  green_zone: last_word_or_last_line
  final_punctuation: "."
evidence_caption:
  required_on: [screenshot, statistic, testimonial]
  text_default: "Captura real de Gragica · colegio de demostración, datos ficticios."
  size_px: { web: 13, ad-4x5: 20, post-1x1: 20, story-9x16: 22, slide-16x9: 22 }
frame:
  background: "#FFFFFF"
  radius_px: 14
  phone_radius_px: 28
  border: "1px #E0E7DF"
  shadow: "0 1px 2px rgb(0 0 0 / 0.04)"
  browser_chrome: false
  device_mockup: false
  perspective: false
  max_per_piece: 1
data_headline:
  max_numbers_per_piece: 1
  unit_ratio: 0.35
  source_required: true
document_language:
  rule_px: 1
  section_numbering: arabic_serif
diagonal_g:
  status: exploration
  angle_deg: 25
assets_per_piece: [1, 3]
```
