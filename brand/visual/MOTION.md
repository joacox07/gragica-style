# Motion

## Principios

1. **El movimiento explica, no decora.** Algo se mueve porque cambió de estado, llegó o se fue.
2. **Una sola curva.** `cubic-bezier(0.2, 0.8, 0.2, 1)`: arranca decidida y frena suave, como alguien que sabe adónde va.
   Ya es la curva de todo el producto (`--ease` en `tokens.css`); marketing y video usan la misma.
3. **Corto.** 120 / 180 / 260 ms en producto. En video, los desplazamientos duran entre 300 y 600 ms y los fundidos
   260 ms; lo demás es quietud para leer.
4. **Poco recorrido.** Los elementos se desplazan 8–48px, no cruzan la pantalla.
5. **Respeto por quien lee.** Con `prefers-reduced-motion`, todo pasa a 0 ms (ya implementado). En video, ningún texto
   está en pantalla menos que el tiempo de leerlo dos veces.

Nota: la landing actual **no tiene animaciones de entrada ni parallax** (decisión documentada en
`GragicaLanding.tsx`); solo un crossfade entre capturas en la sección de producto. Es coherente con estos principios.

## Producto (Nivel 1)

| Token | Duración | Uso |
|---|---|---|
| `--dur-fast` | 120 ms | hover, toggles, cambio de color |
| `--dur-base` | 180 ms | transición por defecto, tabs, acordeones |
| `--dur-slow` | 260 ms | overlays, hojas, crossfade de capturas |

Overlays: escala 0,96 → 1 con fundido. Skeletons: shimmer de 1,6 s. Fuente: `packages/ui/src/lib/motion.ts`.

## Marketing y video

### Tipografía: líneas que suben

El titular entra **línea por línea**, cada línea subiendo desde su propia caja de recorte (el componente
`RisingLines` de la landing ya prepara el recorte). Recorrido: 0,6 em. Duración: 520 ms por línea, desfase 90 ms.
El remate (la línea verde) entra último y es lo que queda quieto más tiempo.

### Capturas

- Entran con fundido + subida de 24–48px, 600 ms.
- Se recorren con **paneos lentos y rectos** (no zoom rápido, no 3D): 40–80 px/s.
- Para destacar una parte: se oscurece el resto al 60 % o se recorta, no se dibuja un círculo rojo.
- Cursor: el real, a velocidad humana; los clics se marcan con un anillo verde de 24px que se desvanece en 260 ms.

### Transiciones entre planos

Corte seco o fundido de 260 ms. Nada de cubos, giros, zooms de lente ni barridos con blur.
*(El barrido diagonal derivado de la G está en exploración: ver [DISTINCTIVE_ASSETS § 6](DISTINCTIVE_ASSETS.md#6-la-diagonal-de-la-g-en-exploración--no-usar-en-producción).)*

### Stagger

Listas y grupos: 60–90 ms entre elementos, máximo 6 elementos con stagger (el resto entra junto).

## Logo

**Animación de firma (2,0 s):**

1. 0–600 ms: la G aparece con fundido y escala 0,94 → 1 (curva estándar).
2. 500–1100 ms: el wordmark entra con fundido y subida de 0,3 em.
3. 1100–2000 ms: quieto.

*(Una versión donde el corte diagonal de la G “se escribe” queda en exploración junto con [DISTINCTIVE_ASSETS § 6](DISTINCTIVE_ASSETS.md#6-la-diagonal-de-la-g-en-exploración--no-usar-en-producción).)*

Versión corta (0,8 s): fundido simple del lockup. Nunca: rebote, giro, brillo que barre, partículas, glitch.

## Loading

En producto, skeletons (forma de lo que viene) antes que spinners. En marketing y video no hay “cargando”.

## Reels, anuncios y demos

- Duración: anuncios 6–15 s; reels 15–30 s; demos de producto 30–90 s.
- Estructura: titular (remate) 0–2 s → evidencia (captura real) → cierre con logo y CTA en los últimos 2 s.
- Ritmo: un cambio cada 1,5–3 s. Más rápido se vuelve ansioso; Gragica es tranquila.

## Parámetros

```yaml
easing: [0.2, 0.8, 0.2, 1]
product_ms: { fast: 120, base: 180, slow: 260 }
reduced_motion: zero_duration
travel_px: [8, 48]
video:
  move_ms: [300, 600]
  rising_lines: { per_line_ms: 520, stagger_ms: 90, travel_em: 0.6 }
  screenshot_enter: { ms: 600, travel_px: [24, 48] }
  pan_px_per_s: [40, 80]
  crossfade_ms: 260
  stagger_ms: [60, 90]
  stagger_max_items: 6
  click_ring: { size_px: 24, fade_ms: 260, color: brand.primary }
  cut_every_s: [1.5, 3]
  min_text_on_screen_s: 2.5
logo_animation:
  full_ms: 2000
  short_ms: 800
  forbidden: [bounce, spin, shine_sweep, particles, glitch]
durations_s: { ad: [6, 15], reel: [15, 30], demo: [30, 90] }
```
