# Canva y Google Slides

Las plantillas canónicas son HTML (`brand/assets/templates/`). Canva y Slides son réplicas: si difieren, manda el HTML.

## Brand Kit de Canva

1. **Logos:** subir `brand/assets/logos/png/` (lockup horizontal, lockup blanco, vertical, isotipo, app icon) y,
   si el plan lo permite, los SVG de `brand/assets/logos/`.
2. **Colores** (en este orden):
   `#2F6F2A` Verde Gragica · `#0D1C0D` Verde noche · `#5BAE66` Verde sobre noche · `#FCFDFC` Papel ·
   `#F3F7F2` Papel hundido · `#1F2023` Tinta · `#61656B` Tinta atenuada · `#E0E7DF` Filete · `#C98E18` Dorado ·
   `#8D6411` Dorado texto.
3. **Tipografías:** Título → Source Serif 4 SemiBold. Subtítulo → Source Sans 3 SemiBold. Cuerpo → Source Sans 3 Regular.
   Si Canva no las tiene, subir los TTF de Google Fonts (`Source Serif 4`, `Source Sans 3`).
4. **Plantillas:** recrear `ad-4x5`, `post-1x1`, `story-9x16` y `slide-16x9` tomando las medidas de los HTML
   (márgenes y tamaños en la sección Parámetros de cada doc). Bloquear el logo y los márgenes.
5. **Prohibido en Canva:** sus elementos gráficos (stickers, formas, ilustraciones), efectos de texto (sombra, neón,
   curva), fondos con degradado, fotos de la biblioteca de stock con personas.

## Tema de Google Slides

1. Archivo → Tema → Editar tema.
2. Colores del tema: Texto oscuro 1 `#1F2023`, Fondo claro 1 `#FCFDFC`, Texto oscuro 2 `#0D1C0D`,
   Fondo claro 2 `#F3F7F2`, Énfasis 1 `#2F6F2A`, Énfasis 2 `#C98E18`, Énfasis 3 `#08919C`, Énfasis 4 `#C96134`,
   Énfasis 5 `#855AAF`, Énfasis 6 `#61656B`, Vínculo `#2F6F2A`.
3. Fuentes (en “Más fuentes”): títulos Source Serif 4, cuerpo Source Sans 3.
4. Diseños maestros: Portada, Separador, Título y texto, Captura, Cifra, Comparación, Cierre — según
   [PRESENTATIONS](PRESENTATIONS.md). Tamaño 16:9 (1920×1080 equivale a 25,4×14,29 cm).
5. Lockup (320px) en Portada y Cierre; en las demás, isotipo de 40–48px abajo a la izquierda y número de slide a la derecha, sobre un filete ([PRESENTATIONS](PRESENTATIONS.md)).

## Para el remate

Ni Canva ni Slides tienen “estilos de carácter” persistentes: escribir el titular en Tinta y pintar a mano la última
palabra (y el punto) en `#2F6F2A`.

## Parámetros

```yaml
canonical: html_templates
canva_brand_colors: ["#2F6F2A", "#0D1C0D", "#5BAE66", "#FCFDFC", "#F3F7F2", "#1F2023", "#61656B", "#E0E7DF", "#C98E18", "#8D6411"]
fonts: { heading: "Source Serif 4 SemiBold", subheading: "Source Sans 3 SemiBold", body: "Source Sans 3 Regular" }
slides_theme:
  dark1: "#1F2023"
  light1: "#FCFDFC"
  dark2: "#0D1C0D"
  light2: "#F3F7F2"
  accents: ["#2F6F2A", "#C98E18", "#08919C", "#C96134", "#855AAF", "#61656B"]
  link: "#2F6F2A"
slides_size_cm: [25.4, 14.29]
canva_forbidden: [canva_elements, text_effects, gradient_backgrounds, stock_people]
```
