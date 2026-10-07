# Ilustración, 3D y Gragi

## Decisión

Gragica **no tiene un lenguaje de ilustración** y no lo necesita. Lo que en otras marcas resuelve la ilustración
(explicar, dar calidez, llenar espacio) acá lo resuelven el producto real, la tipografía y la voz. Las ilustraciones
genéricas de SaaS (personajes planos con brazos largos, isométricos, escenas de oficina) están prohibidas.

La única excepción es **Gragi**, la mascota del asistente.

## Lo que sí se dibuja: diagramas

Para explicar cómo funciona algo (aislamiento de datos, flujo de un comunicado, niveles de un colegio):

- Líneas de 1,5–2px en tinta o verde, cajas rectas con radio 6px, etiquetas en Source Sans 3.
- Máximo 3 colores: tinta, verde y un estado si hace falta.
- Sin sombras, sin 3D, sin íconos decorativos dentro de las cajas.
- Siempre con una frase que diga qué muestra el diagrama.

## Gragi

**Qué es:** robot 3D blanco con pantalla negra, ojos y sonrisa en verde neón, antena, mochila escolar verde con
lápices y la G en el pecho. Archivos: `brand/assets/gragi/gragi.webp` (cuerpo entero) y `gragi-head.webp`
(cabeza). Es la mascota oficial del asistente y **se usa tal cual** (decisión de marca 2026-10-07).

**Dónde aparece:**

| ✅ | ❌ |
|---|---|
| Botón flotante y panel del asistente en el producto | Documentos institucionales, PDFs, membretes, propuestas |
| Piezas de marketing **sobre el asistente** | Piezas que no hablan del asistente |
| Onboarding y ayuda del asistente | Emails transaccionales |
| Campañas (Nivel 4) como personaje | Co-branding con un colegio (salvo pantallas del asistente) |
| Stickers, merch de evento | Avatar de la cuenta de Gragica en redes (eso es la G) |

**Reglas:**

- No se recolorea, no se redibuja en otro estilo, no se le cambia la ropa ni la mochila.
- No se le agregan expresiones, poses o accesorios generados con IA sin aprobación: un personaje inconsistente es peor que ninguno.
- Su verde neón (`#36C251`) no sale del personaje: no se usa en textos, fondos ni botones de la pieza.
- Siempre sobre papel, blanco o verde noche; nunca sobre fotos ni sobre el color de un colegio.
- Tamaño en piezas: entre 20 % y 45 % del alto del lienzo. Nunca más grande que el titular en importancia.
- Gragi mira o saluda hacia el texto, no hacia afuera de la pieza (espejar la imagen está permitido).
- Habla en globo solo en piezas sobre el asistente, con su voz ([VOICE_AND_TONE](../verbal/VOICE_AND_TONE.md#gragi-tiene-su-propia-voz-dentro-de-la-misma)).

*Nota de criterio:* el robot tiene un estilo (3D brillante, neón) distinto del resto de la marca. Es una tensión
aceptada: vive en su territorio (el asistente) y no contamina lo demás. Si en el futuro se quiere integrarlo mejor,
el camino es redibujarlo en la paleta de marca, no agregarle más personajes.

## 3D y arte generativo

No. Ni íconos 3D, ni fondos generativos, ni “orbes de IA”. La tecnología se muestra en lo que hace (el producto), no
en efectos visuales.

## Parámetros

```yaml
illustration_language: none
diagrams: { stroke_px: [1.5, 2], radius_px: 6, max_colors: 3, shadows: false }
gragi:
  assets: [brand/assets/gragi/gragi.webp, brand/assets/gragi/gragi-head.webp]
  recolor: false
  ai_variations: requires_approval
  height_ratio_of_canvas: [0.20, 0.45]
  allowed_backgrounds: [paper, white, night]
  allowed_levels: [1, 3, 4]       # 3 solo en piezas sobre el asistente; nunca 2
  mirror_allowed: true
generative_3d: false
```
