# IA generativa

Gragica produce buena parte de sus piezas con IA: Claude Code u otros agentes componiendo las plantillas HTML,
ChatGPT Images para imágenes y Higgsfield para video. Estas reglas evitan que la herramienta se convierta en el estilo.

## Principio

**La IA compone y produce; no inventa.** La marca se sostiene con tipografía, color, voz y evidencia real. Una pieza
de Gragica tiene que seguir siendo Gragica si se le saca todo lo generado ([PRINCIPLES § 6](../foundation/PRINCIPLES.md#6-la-herramienta-no-es-el-estilo)).

## Qué puede hacer la IA

| ✅ Sí | Con qué |
|---|---|
| Componer piezas a partir de las plantillas HTML | Claude Code / Codex + `brand/assets/templates/` + `scripts/brand/render.mjs` |
| Escribir y revisar copy con la guía de voz | Cualquier LLM + [AGENT_BRIEF](AGENT_BRIEF.md) |
| Generar fondos: espacios de colegio sin gente, objetos sobre una mesa, texturas; como máximo, manos o siluetas lejanas de **adultos** sin rostro | ChatGPT Images, con [IMAGE_PROMPTS](IMAGE_PROMPTS.md) |
| Animar piezas existentes (líneas que suben, paneo de captura real) | Higgsfield / editor, con [VIDEO_PROMPTS](VIDEO_PROMPTS.md) |
| Subtitular, transcribir, resumir grabaciones reales | Cualquier herramienta |

## Qué NO puede hacer la IA (nunca)

- **Inventar el producto:** ninguna pantalla, dashboard ni interfaz de Gragica generada. Las capturas salen del
  producto corriendo (`scripts/capture-landing-shots.mjs`) y se muestran en el marco liso, no dentro de fotos
  de teléfonos o laptops ([DISTINCTIVE_ASSETS § 3](../visual/DISTINCTIVE_ASSETS.md#3-el-marco)).
- **Inventar evidencia:** testimonios, citas, nombres de colegios, cifras, logos de clientes, premios.
- **Generar menores identificables.** Tampoco “alumnos” con rostro detallado, aunque sean ficticios.
- **Generar personas que se presenten como reales** (docentes, directivos, familias “de Stella Maris”).
- **Imitar escudos o identidades** de colegios reales.
- **Redibujar o variar el logo** o generar nuevas poses/expresiones de Gragi sin aprobación.
- **Escribir texto dentro de la imagen generada.** El texto siempre se compone después, en la plantilla, con la tipografía real.

## Flujo recomendado

1. **Escribir** el titular y la bajada con [COPY_GUIDELINES](../verbal/COPY_GUIDELINES.md).
2. **Elegir** plantilla y nivel.
3. **Evidencia:** captura real (o recorte de una existente en `brand/assets/screenshots/`).
4. **Imagen generada (opcional):** solo fondo u objeto, con el prompt base de [IMAGE_PROMPTS](IMAGE_PROMPTS.md).
5. **Componer** en HTML, **renderizar**, **revisar** con el checklist de [ADS](../applications/ADS.md#checklist).
6. **Postproducción** de imágenes generadas: recortar a la grilla, bajar saturación si hace falta, quitar artefactos
   (manos, texto falso, logos inventados), nunca agregar efectos.

## Rotular

Las imágenes generadas que muestren escenas (no texturas) se guardan con el prefijo `ai-` en el nombre del archivo y
con su prompt en un `.txt` al lado. El estilo es documental, pero ninguna imagen generada puede presentarse como foto
de un colegio o una persona reales: si alguien podría creer que es un colegio cliente identificable, no se usa.
La fotografía de personas está inactiva ([PHOTOGRAPHY](../visual/PHOTOGRAPHY.md)); estos prompts cubren espacios y objetos.

## Parámetros

```yaml
allowed: [compose_templates, write_copy, backgrounds_spaces_objects, adult_hands_or_distant_silhouettes, animate_existing, subtitles]
forbidden: [generated_ui, fake_testimonials, fake_metrics, identifiable_minors, real_person_impersonation, school_crest_imitation, logo_variations, gragi_variations_without_approval, text_in_generated_images]
generated_file_prefix: "ai-"
prompt_sidecar: ".txt"
```
