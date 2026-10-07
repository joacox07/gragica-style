# Iconografía

## Familia

**Lucide** (`lucide-react`, ya usado en 319 imports del producto). Es la única familia de íconos de Gragica, en
producto y en marketing. No se mezclan Material Symbols, Phosphor, Heroicons ni íconos de stock.

- **Estilo:** outline, trazo uniforme, extremos y esquinas redondeados (el estándar de Lucide).
- **Trazo:** 2px a 24px (proporcional: a 16px queda 1,33px visual). En pestañas activas del teléfono el producto usa 2,5.
- **Relleno:** no. La única excepción es un estado activo explícito del producto.
- **Color:** hereda el del texto (`currentColor`). Verde solo si el ícono es la acción principal o un estado de marca.

## Tamaños estándar

| Contexto | Tamaño | Trazo |
|---|---|---|
| Inline con texto chico (13–15px) | 16px | 2 |
| Botón, fila de lista | 16–20px | 2 |
| Navegación del teléfono | 24px | 2 (2,5 activo) |
| Marketing (lista de funciones) | 28–32px | 1,75 |
| Slide / social | 48–64px | 1,5 |
| Nunca | > 96px | — un ícono gigante es una ilustración pobre |

Corrección óptica: a tamaños grandes, bajar el trazo (1,5–1,75) para que no se vea pesado al lado de la tipografía.

## En marketing

- El ícono acompaña, no protagoniza. Ningún anuncio tiene un ícono como imagen principal.
- Sin contenedores de colores (círculos pastel con un ícono adentro): es el lenguaje genérico de SaaS. Si hace falta
  agrupar, un filete o el ícono solo, en tinta o verde.
- Sin íconos 3D, con degradado o con sombra.

## Cuándo un ícono propio

Solo cuando Lucide no tiene el concepto **y** el concepto es del dominio escolar argentino (por ejemplo, el acuse
“notificado” del cuaderno de comunicados). Un ícono propio se dibuja en la grilla de Lucide (24×24, trazo 2, padding
2px, extremos redondeados) para que no se note. Hoy existen `GragiGlyph` (cabeza de Gragi, raster) e íconos de materia
(`SubjectIcon`); los SVG de Stella Maris son del colegio, no de Gragica.

## Parámetros

```yaml
family: lucide
style: outline
stroke_px: { default: 2, active_nav: 2.5, marketing: 1.75, large: 1.5 }
sizes_px: { inline: 16, control: [16, 20], nav: 24, marketing: [28, 32], slide_social: [48, 64], max: 96 }
fill: false
container_shapes: false
color: currentColor
custom_icon_grid: { canvas: 24, padding: 2, stroke: 2, caps: round, joins: round }
```
