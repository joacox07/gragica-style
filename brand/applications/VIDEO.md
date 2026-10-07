# Video

## Identidad audiovisual

Gragica en video es **una persona mostrando su pantalla con calma**: grabaciones reales del producto, titulares
serif que suben línea por línea, cortes secos, un ritmo que deja leer.

| Elemento | Especificación |
|---|---|
| **Títulos** | Source Serif 4 Semibold, alineado a la izquierda, remate verde; entra con “líneas que suben” ([MOTION](../visual/MOTION.md)). |
| **Lower thirds** | Filete verde de 4px a la izquierda + nombre en sans semibold + cargo y colegio en sans regular atenuada, sobre bloque papel al 92 % o directamente sobre zona tranquila. Entra en 260 ms, queda ≥ 3 s. |
| **Subtítulos** | Source Sans 3 Semibold, blanco sobre caja tinta al 75 %, radio 6px, máx. 2 líneas de 32 caracteres. Siempre. |
| **Captions de UI** | Etiquetas de la interfaz entre «comillas», en sans, cerca de la acción. |
| **Transiciones** | Corte seco o fundido de 260 ms. |
| **UI demos / screen recordings** | Pantalla real en marco liso sobre fondo papel; 60 fps; cursor real; clic marcado con anillo verde de 24px; zoom máx. 1,5× con la curva estándar. |
| **Logo animation** | Firma de 2 s o versión corta de 0,8 s ([MOTION § Logo](../visual/MOTION.md#logo)). |
| **End card** | Verde noche; remate en `#5BAE66`; lockup blanco; URL; 2–3 s. |
| **Locución (texto)** | En voseo, como la caption. |
| **Música** | Instrumental, acústica o piano/guitarra con pulso suave, 80–100 BPM, sin drops ni “corporate ukelele”. Licencia verificada. |
| **Sound design** | Mínimo: un clic suave en acciones, nada de whooshes. Volumen de música −18 LUFS bajo la voz. |
| **Voz en off** | Rioplatense natural, ritmo de conversación, sin locutor de radio. |
| **Ritmo** | Un cambio cada 1,5–3 s; texto en pantalla ≥ 2,5 s. |

## Formatos

| Pieza | Formato | Duración |
|---|---|---|
| Anuncio | 9:16 y 4:5 | 6–15 s |
| Reel | 9:16 | 15–30 s |
| Demo de función | 16:9 (y recorte 9:16) | 30–90 s |
| Tutorial | 16:9 | ≤ 3 min por tarea |

## Grabación de pantalla

Antes de grabar: colegio demo con datos prolijos (tildes, nombres verosímiles), tema claro, notificaciones
silenciadas, zoom del navegador 100–110 %, ventana 1440×900. Nunca datos reales de alumnos.

## Parámetros

```yaml
fps: { screen: 60, footage: [25, 30] }
lower_third: { rule_px: 4, rule_color: brand.primary, enter_ms: 260, min_on_screen_s: 3 }
subtitles: { font: "Source Sans 3", weight: 600, color: "#FFFFFF", box: "rgba(31,32,35,0.75)", radius_px: 6, max_lines: 2, max_chars_per_line: 32, required: true }
transitions: { cut: true, crossfade_ms: 260, others: forbidden }
screen_zoom_max: 1.5
click_ring_px: 24
end_card: { background: "#0D1C0D", remate_color: "#5BAE66", duration_s: [2, 3] }
music: { bpm: [80, 100], loudness_lufs_under_voice: -18 }
recording_window_px: [1440, 900]
durations_s: { ad: [6, 15], reel: [15, 30], demo: [30, 90], tutorial_max: 180 }
```
