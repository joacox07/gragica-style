# Prompts de imagen

Pensados para ChatGPT Images (GPT Image) y modelos similares. Se escriben en inglés (los modelos responden mejor),
con un bloque fijo de estilo + el sujeto + los negativos. **Nunca pedir texto dentro de la imagen.**

## Bloque base (pegar siempre)

```
Documentary photograph, natural morning light from a side window, 5200K neutral-warm white balance,
35mm lens look at eye level, f/2.8 shallow depth of field, medium-low contrast with lifted blacks,
slightly desaturated colors, deep forest-green accents, quiet and orderly composition with generous
negative space on the left for text, real Argentine private school setting (worn floor tiles, tall
windows, painted walls, cork boards), unposed, nobody looking at the camera, no text, no logos.
```

## Negativos (pegar siempre)

```
Avoid: children's faces, identifiable minors, people smiling at camera, raised hands, graduation caps,
apples on books, holograms, glowing screens, floating UI, futuristic classrooms, robots, neon, teal-and-orange
grading, lens flare, studio lighting, stock-photo look, American school lockers or yellow buses, text,
letters, signs with words, logos, watermarks, plastic skin, extra fingers.
```

## Modificadores

| Para | Agregar |
|---|---|
| Fondo de anuncio (papel) | `bright, airy, mostly off-white walls, 60% empty space on the left` |
| Fondo oscuro (para verde noche) | `dim late-afternoon light, deep green shadows, low key, large dark empty area` |
| Formato 4:5 | `vertical 4:5 composition, subject in the lower right third` |
| Formato 9:16 | `tall 9:16 composition, top 15% and bottom 20% empty` |
| Formato 16:9 | `wide 16:9 composition, subject on the right third` |

## Recetas

**1. Pasillo vacío a la mañana** (awareness, portada)
```
[BASE] An empty school corridor at 8 am, morning sun on the floor tiles, a row of classroom doors,
a cork board with blank papers, nobody in frame. [MOD 4:5] [NEGATIVOS]
```

**2. Escritorio de preceptoría** (fondo de objetos)
```
[BASE] Top-down view of a wooden school office desk: an attendance notebook closed, a pen, a mug,
folders, a smartphone lying face down. Large empty area of the desk on the left. [NEGATIVOS]
```
*Las capturas del producto no se insertan en fotos: van en el marco liso, al lado o sobre una banda.*

**3. Manos de docente con un cuaderno** (campaña)
```
[BASE] Close-up of an adult teacher's hands writing in a school attendance notebook, classroom softly blurred
behind. Adult hands only, no face, no screens. [NEGATIVOS]
```

**4. Sala de profesores** (institucional)
```
[BASE] A small teachers' room in an Argentine school, a long table with folders and a laptop closed,
a kettle, a window with plants. No people. [MOD 16:9] [NEGATIVOS]
```

**5. Textura de papel** (fondo neutro, impresión)
```
Flat scan of off-white uncoated paper, very subtle fiber texture, even lighting, no shadows, no folds,
color close to #FCFDFC. No text.
```

**6. Patio desde arriba** (campaña, inicio de ciclo lectivo)
```
[BASE] High-angle wide shot of an empty school courtyard at the start of the school day, long morning shadows,
a flag pole and a covered gallery. No people. [MOD 9:16] [NEGATIVOS]
```

## Revisión de una imagen generada

- [ ] ¿Hay algún rostro de menor? → descartar.
- [ ] ¿Hay texto, letreros o logos inventados? → descartar o retocar.
- [ ] ¿Parece un colegio argentino y no uno estadounidense?
- [ ] ¿Hay espacio negativo donde va el texto?
- [ ] ¿La luz y el color coinciden con [PHOTOGRAPHY](../visual/PHOTOGRAPHY.md)?
- [ ] ¿Se podría confundir con una foto real de un colegio cliente? → no usar.

## Parámetros

```yaml
language: en
base_block: required
negatives_block: required
text_in_image: false
people: { minors: never, adults: hands_or_distant_silhouettes_only }
product_screens_in_images: false
white_balance_k: 5200
lens_mm: 35
aperture_f: 2.8
negative_space: left
```
