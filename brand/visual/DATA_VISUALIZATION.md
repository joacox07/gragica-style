# Visualización de datos

Gragica muestra datos de colegios: notas, asistencia, sanciones, promedios por curso. Los gráficos tienen que poder
leerlos un director apurado y una familia sin práctica.

## Principios

1. **Primero la frase, después el gráfico.** Cada gráfico tiene un título que dice la conclusión
   (“5° B bajó su promedio 0,8 puntos”), no el tema (“Promedio por curso”). El producto ya lo hace:
   “Más alto: Matemática (Séptimo grado Gaviota) (8,2). Más bajo: …”.
2. **El orden importa más que el color.** Ordenar de peor a mejor cuando se busca qué atender (“Los cursos más bajos primero”).
3. **Un color con sentido.** Si un gráfico tiene una sola serie, va en verde o en tinta, no en arcoíris.
4. **Nunca solo color.** El valor siempre está escrito (al final de la barra, en la celda).

## Paleta

Serie categórica en **orden fijo**, validada para daltonismo (`packages/ui/src/lib/palette.ts`). No se cicla: a partir
de la sexta categoría, se agrupan en “Otros”.

| # | Claro | Oscuro | Nombre |
|---|---|---|---|
| 1 | `#2F752A` | `#3BAA34` | verde bosque |
| 2 | `#08919C` | `#13A2AE` | teal |
| 3 | `#C96134` | `#D27147` | terracota |
| 4 | `#855AAF` | `#9D72C9` | ciruela |
| 5 | `#C3890E` | `#BB8400` | dorado |
| + | tinta atenuada | | Otros |

Verde y dorado **nunca adyacentes** (ΔE bajo para protanopía).

## Semáforo de rendimiento

Para notas y asistencia, el color es semántico, no categórico:

| Rango (escala 1–10, aprobación con 6) | Color | Texto |
|---|---|---|
| < 6 desaprobado | error `#CC2A1E` | el número en rojo |
| 6–6,99 en riesgo | advertencia `#9D5E07` | el número en ámbar oscuro |
| ≥ 7 aprobado | tinta (neutro) | el número sin color |
| destacado (≥ 9, o récord) | éxito `#1C7D3F` | el número en verde |

Criterio: **solo se colorea lo que pide atención**. Una planilla toda pintada no comunica nada. *(La planilla actual del
producto colorea casi todas las celdas.)* Los umbrales los define cada colegio; estos son los
de referencia.

## Formas

| Forma | Usar para | Reglas |
|---|---|---|
| **Barras horizontales** | Comparar cursos, materias, docentes | La forma por defecto. Ordenadas. Etiqueta a la izquierda, valor al final de la barra. Radio 2px en el extremo. |
| **Barras verticales** | Evolución por trimestre (≤ 6 períodos) | Eje en cero siempre. |
| **Líneas** | Evolución continua (asistencia por semana) | Máx. 3 líneas; la importante en verde 2,5px, las demás en tinta atenuada 1,5px. |
| **Barra de progreso fina** | Porcentaje dentro de una tabla (aprobación, asistencia) | Pista `rgba(17,20,19,.09)`, 6px de alto. Ya usada en el Inicio del director. |
| **Donut** | Una sola proporción (aprobados/desaprobados) | Máx. 2 segmentos + resto. Cifra en el centro en serif. Nunca torta 3D, nunca > 3 segmentos. |
| **Tabla** | Cuando el número exacto importa | Cifras tabulares, alineadas a la derecha, filetes horizontales, sin cebra fuerte. |
| **No usar** | Radar, gauge decorativo, burbujas, 3D, área apilada de > 3 series | |

## Ejes, grillas, etiquetas

- Grilla horizontal tenue (`rgba(17,20,19,.08)`), sin grilla vertical.
- Eje con valor mínimo y máximo de la escala real (notas: 0–10).
- Etiquetas en Source Sans 3, 12–13px, tinta atenuada. Leyenda arriba a la izquierda, no abajo.
- Tooltips: valor + contexto (“7,6 · 5° B · 2° trimestre”).
- Decimales: uno (“7,6”). Porcentajes sin decimales salvo diferencias < 1 punto.

## En marketing

- Un gráfico en una pieza de marketing es una **captura real** del producto (en marco, con pie) o una versión
  simplificada con datos declarados como de demostración.
- Máximo 6 barras o 2 líneas en un anuncio.
- La cifra protagonista va como “dato como titular” ([DISTINCTIVE_ASSETS § 5](DISTINCTIVE_ASSETS.md#5-los-datos-como-titular)).

## Accesibilidad

Contraste ≥ 3:1 de cada serie contra el fondo; valor escrito en cada barra; nunca distinguir solo por rojo/verde;
texto alternativo que diga la conclusión.

## Parámetros

```yaml
series_light: ["#2F752A", "#08919C", "#C96134", "#855AAF", "#C3890E"]
series_dark:  ["#3BAA34", "#13A2AE", "#D27147", "#9D72C9", "#BB8400"]
max_series_before_others: 5
grade_scale: { min: 0, max: 10, pass: 6, risk_below: 7, highlight_from: 9 }
colors_grade: { fail: "#CC2A1E", risk: "#9D5E07", pass: ink, highlight: "#1C7D3F" }
grid: { horizontal: "rgba(17,20,19,0.08)", vertical: none, track: "rgba(17,20,19,0.09)" }
axis_label_px: [12, 13]
bar: { end_radius_px: 2, progress_height_px: 6 }
line: { primary_px: 2.5, secondary_px: 1.5, max_lines: 3 }
donut: { max_segments: 3 }
decimals: 1
marketing: { max_bars: 6, max_lines: 2 }
forbidden: [radar, gauge, bubble, 3d, pie_3d, stacked_area_gt3]
```
