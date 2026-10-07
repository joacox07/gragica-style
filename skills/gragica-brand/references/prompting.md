# Prompting para herramientas generativas

> Reglas completas y prompts de la marca: `brand/ai/GENERATIVE_AI.md`, `brand/ai/IMAGE_PROMPTS.md`, `brand/ai/VIDEO_PROMPTS.md`. Esta guía es el resumen operativo; si difieren, mandan los docs de `brand/ai/`.

Principio: **la IA genera materia prima, la marca la compone.** El modelo generativo produce un fondo, un objeto o un
plano de video. El titular, el logo, la captura del producto y los datos se agregan después en HTML/Canva con esta skill
y pasan por el lint. La marca no depende de ninguna herramienta.

## Qué se puede generar y qué no

| ✅ Se puede | ❌ Nunca |
|---|---|
| Textura sutil de papel o cartulina para un fondo | Personas presentadas como reales (docentes, familias, directivos) |
| Objetos escolares sin personas: cuaderno de comunicados, carpeta, boletín en blanco, lapicera, tiza sobre mesa de madera | Menores, en cualquier forma |
| Ambientes de colegio vacíos: aula con luz de mañana, pasillo, patio | Pantallas, interfaces, dashboards o dispositivos con pantalla (ni vacía ni chroma): el producto se muestra solo con capturas reales en el marco |
| Como máximo, **manos o siluetas lejanas de adultos sin rostro** (por ejemplo, manos de una docente sosteniendo un cuaderno) | Texto dentro de la imagen (sale mal y no es nuestra tipografía) |
| Planos de video de objetos y espacios para reels | Logos, escudos de colegios, la G |
| Variaciones de Gragi **solo** a partir del render oficial, sin cambiar diseño ni colores (pose, si la herramienta lo respeta) | Gragi redibujado, recoloreado o en otro estilo |

## Bloque base (pegar siempre)

```
Estilo: fotografía editorial documental, luz natural de mañana entrando lateral por una ventana,
temperatura 5000–5500 K, contraste medio, sombras suaves, colores apagados y naturales con predominio
de verdes bosque, blancos papel y maderas claras; sin saturación artificial. Lente equivalente 35–50 mm,
profundidad de campo media (f/4–f/5.6), encuadre sobrio y ordenado, mucho espacio negativo
{ESPACIO} para colocar texto después. Escena de un colegio privado argentino real, sencillo y cuidado,
no lujoso. Textura de grano fino, como película de baja sensibilidad.
```

`{ESPACIO}`: «en la mitad superior», «en el tercio izquierdo», etc., según dónde va el titular en `formats.md`.

## Negativos (pegar siempre)

```
Sin rostros, sin personas identificables, sin niños, sin manos (salvo que el prompt las pida, siempre de adultos), sin texto, sin letras, sin logos, sin pantallas encendidas
con interfaz, sin hologramas, sin brillos ni destellos de lente, sin neón, sin degradados violetas o azules,
sin estética futurista, sin render 3D brillante, sin estilo stock (sonrisas forzadas, chicos levantando la mano),
sin banderas ni símbolos patrios, sin mate ni clichés argentinos, sin pizarrones con fórmulas.
```

## Plantillas por uso

**Fondo para anuncio 4:5 (papel):**
`[BASE] Primer plano cenital de una hoja de papel de cuaderno sobre mesa de madera clara, una lapicera verde oscuro
apoyada en el borde inferior derecho, el resto de la hoja vacía. Formato vertical 4:5. [NEGATIVOS]`

**Fondo oscuro para story 9:16:**
`[BASE] Pizarrón verde bosque oscuro, limpio, sin escritura, con una franja de luz lateral suave. Formato vertical 9:16,
espacio vacío en el centro. [NEGATIVOS]`

**Manos de adulto (campaña):**
`[BASE] Manos de una docente adulta sosteniendo un cuaderno de comunicados abierto sobre un pupitre, encuadre desde el pecho hacia abajo, sin rostro, luz lateral de ventana. Formato 4:5. [NEGATIVOS, sin la exclusión de manos]`
→ El producto nunca va dentro de una imagen generada: si la pieza necesita mostrarlo, va una captura real en el marco liso.

**Plano de video para reel (Higgsfield / Runway / Sora):**
`[BASE] Plano fijo de 4 segundos: un cuaderno de comunicados cerrado sobre un pupitre; la luz de la ventana avanza
lentamente sobre la tapa. Cámara inmóvil, sin cortes, sin movimiento de cámara brusco, 24 fps. [NEGATIVOS]`
→ Después: sobreimprimir el titular serif con la animación de líneas que suben (`motion.editorial.risingLines`) y cerrar
con el end card de la marca (logo + CTA, 2–3 s).

## Postproducción obligatoria

1. Bajar saturación si algún verde se acerca a un neón; llevar el verde dominante a `#2F6F2A` / `#1C5418`.
2. Revisar que no haya texto, logos ni caras generadas. Si las hay, se descarta (no se retoca).
3. Exportar sin marcas de agua de la herramienta.
4. Componer el resto en HTML con la plantilla del formato y pasar `lint-piece.mjs` + `rubric.md`.
5. Registrar en el brief: `"tool": "chatgpt-images"` (o la que sea) y el prompt usado en `notes`, para poder repetirlo.

## Canva y Google Slides

- Fuentes: Source Serif 4 y Source Sans 3 están en Google Fonts (por lo tanto en Slides). En Canva, si no aparece
  «Source Serif 4», subila como fuente de marca (licencia OFL); no la reemplaces por otra.
- Colores del kit: `#2F6F2A`, `#0D1C0D`, `#FCFDFC`, `#1F2023`, `#4E5156`, `#C98E18`, `#5BAE66`, `#CAD8CA`.
- Logos: subí los PNG de `brand/assets/logos/png/`.
- Al terminar, exportá a PNG y compará contra la rúbrica. El lint no lee archivos de Canva: la rúbrica es obligatoria.
