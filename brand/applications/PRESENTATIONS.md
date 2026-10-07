# Presentaciones

Plantilla base: `brand/assets/templates/slide-16x9.html` (1920×1080). Para Google Slides, ver
[CANVA_AND_SLIDES](CANVA_AND_SLIDES.md).

## Principio

Una slide = una idea = un titular con forma de afirmación. Si alguien lee solo los titulares de la presentación,
entiende el argumento completo.

## Tipos de slide

| Tipo | Composición |
|---|---|
| **Portada** | Fondo verde noche o papel. Eyebrow (cliente/evento · fecha), titular serif con remate, lockup abajo a la izquierda. |
| **Índice** | Lista numerada en serif (`1.` `2.`…), filetes entre ítems, sin íconos. |
| **Separador de sección** | Número de sección enorme en serif verde + título de una línea. Papel hundido. |
| **Texto** | Titular afirmación arriba (≤ 6 palabras); máx. 3 bullets de ≤ 12 palabras; columna de 60 % a la izquierda. |
| **Producto / captura** | Titular arriba; captura en marco sangrando por abajo o a la derecha; pie de evidencia. |
| **Comparación** | Dos columnas con filete central: “Hoy” (tinta atenuada) / “Con Gragica” (tinta + verde). |
| **Cifra** | Una cifra en serif a 280–360px, una línea de explicación, fuente al pie. |
| **Gráfico** | Titular = conclusión. Barras horizontales ordenadas. [DATA_VISUALIZATION](../visual/DATA_VISUALIZATION.md). |
| **Testimonial** | Cita real en serif itálica, « en verde grande, nombre/cargo/colegio en sans. |
| **Cierre** | Remate (“Contanos cómo trabaja **tu colegio.**”), contacto, lockup. Fondo verde noche. |
| **Contacto** | contacto@gragica.com · WhatsApp · gragica.com, en sans, alineado a la izquierda. |

## Variantes por uso

| Uso | Nivel | Diferencias |
|---|---|---|
| Pitch comercial | 3 | Portada y cierre en verde noche; capturas protagonistas; ≤ 15 slides. |
| Onboarding / capacitación | 2 | Fondo papel; pasos numerados; capturas con flechas de 2px verde; más texto permitido (4 bullets). |
| Institucional | 2 | Sin verde noche; lockup con palabra en tinta; más sobrio. |
| Co-branding con un colegio | 2 | Portada con escudo del colegio + lockup de Gragica ([COBRANDING](COBRANDING.md)). |
| Investor deck (eventual) | 3 | Igual que pitch; métricas solo reales, con fecha de corte. |

## Reglas

- Pie de página en todas menos portada: isotipo a la izquierda y número de slide a la derecha, sobre un filete.
- Nada de animaciones de PowerPoint/Slides salvo aparecer (fundido) por elemento.
- Texto mínimo 28px en 1920×1080 (se proyecta).
- Isotipo de 40–48px abajo a la izquierda en todas las slides; lockup de 320px solo en portada y cierre.

## Parámetros

```yaml
canvas: { w: 1920, h: 1080 }
margin_px: { x: 120, y: 96 }
grid: { cols: 12, gutter: 32 }
type_px: { cover_title: [120, 140], title: [96, 140], heading: [64, 88], section_number: 360, body: [30, 36], bullet: [30, 36], caption: 22, min: 28, figure: [200, 320] }
headline_max_words: 6
logo: { slides: { version: mark, width_px: [40, 48], position: bottom-left }, cover: { version: lockup-h, width_px: 320 } }
bullets_max: { pitch: 3, training: 4 }
bullet_max_words: 12
pitch_max_slides: 15
footer: { slide_number: true, brand: "Gragica", except: [cover] }
transitions: fade_only
backgrounds: { cover: [night, paper], section: sunken, closing: night, default: paper }
```
