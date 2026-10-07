# Publicidad

Un anuncio de Gragica le habla a una **dirección de colegio** que no nos conoce. Tiene 1,5 segundos para decir algo
verdadero y concreto. Sirve para Meta (Instagram/Facebook), Google, LinkedIn, impresos, cartelería y eventos.

## Anatomía de un anuncio

```
┌─────────────────────────────┐
│ EYEBROW · TEMA              │  ← opcional
│                             │
│ Titular serif con           │  ← ≤ 8 palabras, remate verde, punto
│ remate.                     │
│ Bajada de una línea.        │  ← ≤ 24 palabras
│                             │
│   [evidencia: captura,      │  ← captura en marco / dato / cita real
│    dato o cita]             │
│                             │
│ G Gragica        CTA →      │  ← lockup abajo izq., CTA abajo der.
└─────────────────────────────┘
```

## Tipos

| Tipo | Estructura | Titular de ejemplo | Evidencia |
|---|---|---|---|
| **Producto** | B | “Las notas, **sin Excel.**” | Captura de la planilla de calificaciones |
| **Problema / solución** | A → B (carrusel o video) | “«No me llegó.» **Nunca más.**” | Captura del acuse de lectura |
| **Feature** | B | “La falta le llega a la familia. **Sola.**” | Captura de asistencia |
| **Testimonial** | A | Cita real en itálica | Nombre, cargo, colegio (con permiso) — si no hay, no hay |
| **Lanzamiento** | A sobre noche, o B con captura | “Gragi ya **arma horarios.**” | Captura real si existe; si no, pieza tipográfica con eyebrow “NUEVO · [FUNCIÓN]” |
| **Institucional** | A | “Gestión escolar, **hecha en Rosario.**” | Lockup grande |
| **Comparación** | B | “Antes: tres planillas. **Ahora: una.**” | Captura; nunca contra un competidor con nombre |
| **Dato** | C | “**10 segundos.**” | “Lo que tarda Gragi en decirte qué cursos bajaron el promedio.” + fuente |
| **Seguridad** | C o A sobre noche | “Una base de datos **por colegio.**” | Explicación del mecanismo |
| **Demo** | B / video | “Mirá cómo se toma **asistencia.**” | Grabación real |
| **Brand awareness** | A sobre noche | “La gestión de tu colegio, **entera.**” | Sólo tipografía + lockup |

Cada tipo puede variar fondo (papel / hundido / noche), borde de sangrado de la captura, escala del titular y
estructura secundaria sin perder identidad.

## Por plataforma

| Plataforma | Formatos | Notas |
|---|---|---|
| Meta feed | 1080×1350 (preferido), 1080×1080 | Texto en imagen ≤ 20 % de la superficie como guía. |
| Meta stories/reels | 1080×1920 | Zonas seguras de [SOCIAL](SOCIAL.md). |
| Google Display | 1200×628, 1200×1200, 300×250, 728×90 | Versión mínima: titular + lockup. Sin captura en 300×250. |
| Google Search | Texto | Títulos ≤ 30 caracteres: “Gestión escolar para colegios”, “Notas, asistencia y boletines”. |
| LinkedIn | 1200×627, 1080×1350 | Más institucional: estructura A o D. |
| Impreso / cartelería | A4, A3, banner 85×200 cm | [PRINT](PRINT.md). |
| Eventos | Banner, pantalla 16:9 | Lockup vertical grande, una frase. |

## Checklist

- [ ] Titular ≤ 8 palabras, termina en punto, remate verde en la palabra que da el sentido.
- [ ] Habla del colegio, no de Gragica.
- [ ] La evidencia es real (captura del producto, dato con fuente, cita con permiso) o no hay evidencia.
- [ ] Captura con pie “datos ficticios” si es demo; datos de demo prolijos.
- [ ] Ningún menor identificable.
- [ ] Logo con zona de resguardo, tamaño ≥ mínimo.
- [ ] Contraste AA en todo texto.
- [ ] Sin emojis, sin degradados, sin mockups 3D, sin palabras prohibidas.
- [ ] Legible al 25 % de tamaño.
- [ ] CTA: botón en infinitivo (“Pedir una demo”) o texto en voseo, ≤ 5 palabras.
- [ ] Sobre verde noche, el botón va en `#5BAE66` con texto `#0D1C0D` (nunca botón `#2F6F2A` sobre noche).
- [ ] Pie de evidencia y logo separados por al menos la zona de resguardo del logo (1u).

## Parámetros

```yaml
audience: school_leadership
headline_max_words: 8
lead_max_words: 24
cta_max_words: 5
text_area_max_ratio: 0.20
logo: { version: lockup-h, width_px_4x5: [200, 240], position: [bottom-left, top-left] }
cta_position: bottom_right
evidence_types: [screenshot, statistic_with_source, real_quote]
testimonials: real_only
competitor_names: forbidden
platform_sizes:
  meta_feed: [[1080, 1350], [1080, 1080]]
  meta_story: [1080, 1920]
  google_display: [[1200, 628], [1200, 1200], [300, 250], [728, 90]]
  linkedin: [[1200, 627], [1080, 1350]]
google_search_title_max_chars: 30
```
