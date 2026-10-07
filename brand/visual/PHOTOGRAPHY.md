# Fotografía

> **Estado: no activo (2026-10).** Gragica hoy no usa fotografía propia. Decisión: la marca se sostiene con
> tipografía, producto real y datos. Este sistema queda listo para cuando haya una sesión (por ejemplo, en Stella Maris
> con consentimiento) o para dirigir imágenes generadas ([IMAGE_PROMPTS](../ai/IMAGE_PROMPTS.md)).
> Las imágenes existentes `front/public/images/login-bg-*` (generadas con IA) y `aside_login.webp` (stock) **no son
> referencia** y no se usan en piezas nuevas.

## Qué fotografía Gragica

**Documental, no publicitaria.** La vida real de un colegio argentino en un día común, mirada por alguien que estaba ahí.

| Sujetos, por prioridad | Situaciones que sí |
|---|---|
| 1. Docentes y preceptores trabajando | Tomando asistencia en el aula, cargando notas en el teléfono en la sala de profesores |
| 2. Directivos | Reunión de equipo directivo con papeles y una laptop, recorriendo un pasillo |
| 3. Familias | Una madre leyendo un comunicado en la puerta del colegio, un abuelo en la salida |
| 4. Espacios | Pasillos, patios, galerías, preceptoría, biblioteca, la entrada a la mañana |
| 5. Alumnos | **Solo** de espaldas, en plano general desenfocado, manos, o con consentimiento escrito |

## Menores (regla dura)

- Por defecto, **ningún rostro identificable de un menor**. Se fotografían manos, espaldas, siluetas a contraluz,
  grupos en plano general con profundidad de campo corta.
- Rostros solo con **consentimiento escrito** de la familia y del colegio, para un uso definido y con fecha de vencimiento.
- Nunca nombre, curso ni uniforme legible junto a un rostro.
- Nunca menores en situaciones de vulnerabilidad, sanción, enfermedad o tristeza.
- Imágenes generadas con IA: **nunca** representar menores identificables ni “alumnos” con rostro detallado.

## Dirección de arte

| Parámetro | Valor |
|---|---|
| Luz | Natural, de ventana o de patio. Mañana (8–11 h). Dirección lateral. Nunca flash directo. |
| Temperatura | Neutra a levemente cálida: 5000–5600 K. |
| Exposición | Correcta a +⅓; sombras con detalle. Nada quemado salvo ventanas. |
| Contraste | Medio-bajo. Negros levantados (no puros). |
| Color | Saturación −10 a −15 %. Verdes desplazados hacia bosque (no lima). Sin teal & orange. |
| Óptica | 35 mm o 50 mm equivalentes. Nada de gran angular deformante ni tele comprimido. |
| Profundidad de campo | f/2–f/4: sujeto nítido, fondo legible pero suave. |
| Composición | Sujeto descentrado, espacio negativo hacia donde va el texto, horizonte recto. |
| Pose | Ninguna. Personas haciendo algo, sin mirar a cámara. |
| Vestimenta | La real del colegio y de los docentes. Sin vestuario armado. |
| Arquitectura | La del colegio argentino tal cual: baldosas, pizarras, ventanales, carteleras, pintura gastada está bien. |
| Tecnología | Presente pero secundaria: un teléfono en la mano, una notebook abierta. Nunca pantallas brillando hacia cámara. |
| Diversidad | La real del colegio. Ni casting de catálogo, ni homogeneidad forzada. |
| Postproducción | Ajustes globales, grano fino natural de la cámara (no agregado), sin retoque de piel. |

## Clichés prohibidos

Chicos levantando la mano sonrientes · niños con tablets mirando a cámara · birrete volando · manzana sobre los libros ·
docente sonriendo a cámara con brazos cruzados · mano de robot y mano humana · hologramas · pantallas con datos
flotando · aulas futuristas · stock con luz de estudio · diversidad de catálogo · fotos de banco de imágenes extranjeras
(aulas estadounidenses, lockers, bus amarillo).

## Tratamiento en piezas

- La foto va **a sangre** o en un rectángulo recto, nunca en círculos, blobs ni formas.
- El texto va sobre zona tranquila de la foto o en una banda papel/noche, nunca con sombra para “despegarlo”.
- Una foto por pieza. Foto + captura: la captura en marco sobre la banda, no sobre la foto.
- Duotono o filtros de color: no.

## Parámetros

```yaml
status: inactive
color_temperature_k: [5000, 5600]
exposure_ev: [0, 0.33]
saturation_pct: [-15, -10]
contrast: medium_low
lens_mm_equiv: [35, 50]
aperture_f: [2, 4]
time_of_day: morning
pose: none
eye_contact: false
minors:
  identifiable_faces_default: false
  requires: [written_family_consent, written_school_consent, defined_use, expiry_date]
  ai_generated_identifiable: never
shape: rectangle_or_bleed
photos_per_piece_max: 1
filters: none
```
