# Merchandising y espacios físicos

No es prioridad hoy; estas reglas aseguran que el lenguaje funcione fuera de una pantalla.

## Principios

- **Una sola cosa por objeto:** la G, el lockup o una frase con remate. Nunca las tres.
- **Pocas tintas:** verde Gragica + blanco, o tinta + papel. Serigrafía a 1–2 colores.
- **Calidad sobre cantidad:** mejor 30 cuadernos buenos que 300 lapiceras que se rompen.
- **Útil en un colegio:** cuadernos, carpetas, lapiceras, tazas para la sala de profesores.

## Aplicaciones

| Objeto | Diseño |
|---|---|
| Remera / buzo | Algodón verde bosque o crudo. G blanca de 8 cm en el pecho izquierdo, o frase con remate en la espalda. |
| Stickers | G troquelada (5 cm), app icon (4 cm), frase “La gestión de tu colegio, entera.” en serif. Gragi en sticker solo en eventos. |
| Cuaderno | Tapa crudo o verde, G en relieve o estampada a una tinta abajo a la derecha. Interior con filete verde fino. |
| Carpeta | A4, verde noche, lockup blanco, solapa con datos de contacto. |
| Lapicera | Lockup a una tinta, tinta negra o azul (la del colegio). |
| Banner / roll-up | 85×200 cm: lockup vertical arriba, una frase con remate al medio (≥ 140 pt), URL abajo; zona inferior 30 cm libre (queda tapada). |
| Stand | Fondo papel o verde noche, una pared con una frase, pantalla 16:9 con demo en loop, sin luces de color. |
| Cartelería | [PRINT](PRINT.md). |
| Packaging | Caja kraft o blanca, G a una tinta, frase en serif en el interior de la tapa. |

## Parámetros

```yaml
max_elements_per_object: 1
inks_max: 2
garment_colors: ["#2F6F2A", "#0D1C0D", natural_cotton]
chest_mark_cm: 8
sticker_cm: { mark: 5, app_icon: 4 }
rollup_cm: { w: 85, h: 200, bottom_safe: 30, headline_min_pt: 140 }
gragi_on_merch: events_only
```
