# Redes sociales (Nivel 3)

No hay 30 plantillas rígidas: hay **una gramática** (estructuras A–D + activos distintivos) y **cuatro plantillas base**.
La variedad sale de combinar estructura, fondo, recorte y escala.

## Plantillas base

| Formato | Tamaño | Plantilla |
|---|---|---|
| Post / carrusel 4:5 | 1080×1350 | `brand/assets/templates/ad-4x5.html` |
| Post 1:1 | 1080×1080 | `brand/assets/templates/post-1x1.html` |
| Story / Reel 9:16 | 1080×1920 | `brand/assets/templates/story-9x16.html` |
| Portada de reel / thumbnail | 1080×1920 (recorte central 1080×1350 visible en grilla) | `story-9x16.html` |

Render: `node scripts/brand/render.mjs brand/assets/templates/<archivo>.html --out salida.png`.

## Reconocimiento a tamaño chico

En el feed una pieza se ve a ~300px. Lo que la hace reconocible a ese tamaño:

1. Titular serif grande con remate verde (legible a 25 %).
2. Fondo papel o verde noche: nada de colores de stock.
3. Mucho aire a la izquierda del titular, alineado a la izquierda.
4. Logo siempre en el mismo lugar dentro de una serie (en 4:5 y 1:1 abajo a la izquierda; en stories, lockup arriba a la izquierda dentro de la zona segura).

## Tipos de contenido

| Tipo | Estructura | Notas |
|---|---|---|
| Lanzamiento de función | B (titular + captura) | Captura real recortada a la tarea. |
| Dato | C | Una cifra, fuente al pie. |
| Quote / caso de éxito | A | Sólo citas reales con nombre, cargo y colegio. |
| Contenido educativo (“cómo hacer X”) | Carrusel A → B → B → C | 5–7 láminas. |
| Feature release | B | Eyebrow “NUEVO · [FUNCIÓN]” (por ejemplo, “NUEVO · BIBLIOTECA”). |
| Seguridad | C o A sobre noche | Mecanismo, no miedo. |
| Detrás de escena | A + foto (cuando haya) | — |

## Carruseles

- Lámina 1 (tapa): estructura A, remate grande; la promesa del carrusel.
- Láminas intermedias: una idea por lámina, número de paso en serif verde (`1.` `2.` `3.`).
- Última lámina: cierre con CTA y lockup.
- Mismo fondo en todas las láminas, o alternancia papel / papel hundido (no noche intercalada).
- Continuidad: un filete horizontal a la misma altura en todas las láminas.

## Stories y reels

- Respetar zonas seguras: en stories, nada importante en los 250px de arriba ni en los 340px de abajo; en reels,
  220px arriba, 420px abajo y 160px a la derecha por los botones. Márgenes laterales de 72px.
- Texto en pantalla ≥ 2,5 s; subtítulos siempre (la mayoría mira sin sonido).
- Reels: titular 0–2 s, evidencia, cierre con logo animado corto (0,8 s).

## Copy

- Caption: 1–3 frases, voseo, sin emojis, sin hashtags en el texto (máx. 3 al final, si se usan).
- CTA en el texto, en voseo: “Escribinos por WhatsApp” / “Pedí una demo en gragica.com”.

## Avatar y perfil

Avatar: `brand/assets/logos/png/gragica-app-icon-1024.png`. Bio: “Gestión escolar para colegios argentinos. Rosario.”

## Parámetros

```yaml
formats:
  feed_4x5: { w: 1080, h: 1350, template: ad-4x5.html }
  feed_1x1: { w: 1080, h: 1080, template: post-1x1.html }
  story_9x16: { w: 1080, h: 1920, template: story-9x16.html, margin_x: 72, safe_top: 250, safe_bottom: 340 }
  reel_9x16: { w: 1080, h: 1920, margin_x: 72, safe_top: 220, safe_bottom: 420, safe_right: 160 }
  reel_grid_crop: { w: 1080, h: 1350, centered: true }
legible_at_scale: 0.25
carousel: { slides: [5, 7], max_ideas_per_slide: 1, step_numbers: serif_green }
caption: { max_sentences: 3, emojis: 0, hashtags_max: 3 }
text_on_screen_min_s: 2.5
subtitles: required
logo_position_in_series: fixed
```
