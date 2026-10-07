# Web pública (Nivel 3)

`gragica.com` (`front/src/app/landing/gragica/`) es hoy la expresión más completa de la marca y la **referencia**
de este sistema. No se modifica como parte de esta etapa.

## Lo que la landing ya hace bien (y toda página nueva repite)

- Tema siempre claro (`force-light`), fondo papel, columna de 1120px alineada a la izquierda.
- Eyebrow verde en mayúsculas espaciadas → titular serif con remate → bajada en sans → CTA.
- Capturas reales en marco liso con el pie de datos ficticios (`SHOT_DISCLAIMER` en `content.ts`).
- Secciones con mucho aire: `py-[clamp(5rem,10vw,9rem)]`.
- Bandas oscuras en verde noche `hsl(120 35% 8%)`.
- Sin animaciones de entrada ni parallax.
- Copy fuera de i18n, para escribir como se habla.
- Afirmaciones verificables (“Three claims, each one true and checkable in this repository”).

## Estructura de una página nueva

1. Nav: isotipo + “Gragica” (serif) · 3–4 links · «Ingresar» · botón «Pedir una demo».
2. Hero: estructura A o B ([LAYOUT](../visual/LAYOUT.md#estructuras-base-gramática)).
3. Secciones: una idea cada una, alternando papel y papel hundido; máximo una banda verde noche por página.
4. Evidencia: captura, caso real o dato con fuente en cada sección.
5. Cierre: «Contanos cómo trabaja tu colegio.» + contacto.
6. Footer: “Gestión escolar para colegios argentinos.” · © Gragica · Rosario, Argentina.

## SEO y metadatos

- Title: `[Tema] — Gragica` o “Gragica — Gestión escolar digital”.
- Description: ≤ 155 caracteres, voseo, concreta.
- Imagen OG: plantilla `brand/assets/templates/og-1200x630.html`.

## Páginas que no siguen el sistema

La referencia es la home (`/`). Otras landings más viejas del repo no siguen este sistema: no usarlas como referencia.

## Parámetros

```yaml
reference_impl: front/src/app/landing/gragica/
theme: light_forced
content_max_px: 1120
padding_x_px: { mobile: 24, desktop: 40 }
section_padding_y: "clamp(5rem, 10vw, 9rem)"
hero_h1_px: [40, 80]
section_h2_px: [32, 52]
night_bands_max_per_page: 1
entrance_animations: false
parallax: false
meta_description_max_chars: 155
og_template: brand/assets/templates/og-1200x630.html
```
