# Prompts de video

Para Higgsfield y modelos similares. Regla madre: **el video generado solo aporta ambiente o movimiento de cámara
sobre material real.** El producto se muestra con grabación de pantalla real ([VIDEO](../applications/VIDEO.md)).

## Bloque base

```
Slow, steady camera movement, documentary style, natural morning light, 5200K, 35mm lens look,
shallow depth of field, muted colors with deep forest-green accents, calm pace, no cuts, no people
facing the camera, no children's faces, no text, no logos, no futuristic elements, no neon, no lens flares.
```

## Recetas

**1. Plano de ambiente para inicio de reel (3–4 s)**
```
[BASE] Slow push-in along an empty Argentine school corridor at 8 am, sunlight on floor tiles.
```

**2. Paneo sobre escritorio (ambiente, 4 s)**
```
[BASE] Slow lateral dolly over a school office desk with an attendance notebook, a pen and a mug. No screens.
```
*La grabación real de la pantalla va después, en el marco liso sobre fondo papel ([VIDEO](../applications/VIDEO.md)).*

**3. Animar una plantilla renderizada (imagen → video)**
```
Animate only the camera: a very slow push-in (5%) over the still image. Do not change, add or animate
any text, letters or logos. Keep every element exactly as in the source image.
```
*Mejor alternativa:* animar la tipografía en un editor con [MOTION](../visual/MOTION.md) (líneas que suben), no con IA.

**4. End card**
No se genera: se hace con la plantilla (verde noche, remate `#5BAE66`, lockup blanco) y la animación corta del logo.

## Estructura de un reel (15–30 s)

| Tiempo | Qué | Fuente |
|---|---|---|
| 0–2 s | Titular con remate | Plantilla `story-9x16.html` animada |
| 2–4 s | Ambiente (opcional) | Receta 1 |
| 4–20 s | Evidencia: grabación real de la función | Pantalla del producto |
| 20–25 s | Resultado / dato | Plantilla `post-1x1.html` adaptada |
| últimos 2–3 s | End card + logo | Plantilla + animación corta |

## Nunca

Personas generadas hablando a cámara, avatares de IA “presentando” Gragica, voces clonadas, Gragi animado con
movimientos o expresiones nuevas sin aprobación, interfaces generadas, texto generado dentro del video.

## Parámetros

```yaml
generated_footage_role: [ambience, camera_motion_on_real_material]
max_generated_clip_s: 4
camera_move: slow
cuts_inside_generated_clip: 0
forbidden: [talking_ai_people, ai_presenters, cloned_voices, new_gragi_animations, generated_ui, generated_text]
reel_structure_s: { headline: [0, 2], ambience: [2, 4], evidence: [4, 20], result: [20, 25], end_card_last: 3 }
```
