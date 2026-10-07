# Recetas por formato

Los números salen de `brand-spec.json › formats`. Esta guía dice **cómo se reparte el espacio** y qué estructura usar.
Coordenadas en px desde la esquina superior izquierda. «M» = margen del formato.

## Estructuras base (gramática)

Toda pieza de marketing se arma con 3–5 de estos bloques, en este orden de lectura:

1. **Eyebrow** (opcional): ≤ 4 palabras, versalitas verdes.
2. **Remate**: el titular serif con su final en verde. Es obligatorio en niveles 3–4 y siempre es lo más grande, salvo
   en la variante «dato», donde la cifra es lo más grande.
3. **Bajada** (opcional): 1–2 frases en sans, tinta secundaria.
4. **Evidencia**: captura real en marco, cifra con fuente, cita real o nada (pieza tipográfica).
5. **Firma**: logo + CTA o pie.

Las **estructuras canónicas** son las cuatro de `brand/visual/LAYOUT.md` (A afirmación, B afirmación + evidencia, C dato,
D documento), en datos en `brand-spec.json › structures`. Declará la que usás en `brief.structure`. Las variantes de abajo
son formas de resolver cada estructura (elegí una por pieza y no mezcles más de dos en una serie):

| Variante | Estructura | Qué domina | Fondo | Evidencia |
|---|---|---|---|---|
| **Remate solo** | A | Titular en el tercio medio, al máximo del rango (110–130 % solo en nivel 4) | papel o noche | ninguna |
| **Remate + captura** | B | Titular en el 40 % superior, captura real que sangra por abajo o a la derecha (35–65 % del lienzo) | papel | captura + pie |
| **Dato** | C | Cifra serif enorme (`figure`) + titular corto debajo | papel o noche | fuente en caption |
| **Detalle** | B | Recorte muy cercano de una captura real (una celda, un botón) a 2–3× | papel | captura + pie |
| **Cita** | A | Comillas «» serif, cita real, autor en label | papel hundido | cita real con permiso |
| **Documento** | D | Filetes, numeración serif (`numeral`), membrete (nivel 2) | blanco | según contenido |

Una bajada puede ser una lista de 2–3 renglones con filetes (fragmentos sin punto final); respeta `maxWordsLead` en total.
**Reel** con UI lateral: usá `reel-9x16` (deja 160px libres a la derecha y 420px abajo), no `story-9x16`.

## ad-4x5 · 1080×1350 (también LinkedIn y Meta feed)

```
M = 88 (x) · 96 (arriba) · 88 (abajo) · 6 columnas, gutter 24
┌────────────────────────────────────────┐
│ 96                                      │
│ EYEBROW (22px, +0.14em)                 │  y ≈ 96
│ Titular serif 96–128px,                 │  y ≈ 140  · ancho ≤ 5 columnas (820px)
│ remate en verde.                        │
│ Bajada sans 34–40px, ≤ 24 palabras      │  y ≈ 140 + alto del titular + 32
│                                         │
│ ┌─────────── captura real ──────────────┼── sangra a la derecha
│ │  alto 400–480, radio 14, borde 1px     │  y ≈ 640–700
│ └────────────────────────────────────────┼─
│ Captura real · datos ficticios (20px)   │  24px debajo del marco
│                                         │
│ [logo 200–240px]          CTA 30px →    │  base a 88 del borde
└────────────────────────────────────────┘
```

- La captura **nunca** tapa el pie ni la firma: calculá alto = ancho × 1800/2880 o recortá con `object-fit: cover`.
- Aire mínimo (nivel 3): 40 % del lienzo sin texto ni imagen.
- Variante oscura: fondo `#0D1C0D`, titular `#FFFFFF`, remate `#5BAE66`, bajada `#CAD8CA`, logo blanco.

## post-1x1 · 1080×1080

M = 80. Igual que 4:5, pero sin bajada si hay captura (no entra con aire). Titular 88–112px, ≤ 7 palabras.
Remate solo: titular en el tercio inferior, logo arriba a la izquierda.

## story-9x16 · 1080×1920 (Stories, Reels, TikTok)

```
0–250     zona tapada por la UI de Instagram → solo fondo
250       logo 220–260px (arriba a la izquierda)
~420      eyebrow + titular 104–140px (≤ 8 palabras)
          bajada 38–44px
~1000     evidencia (captura en marco de ancho completo menos márgenes, o cifra)
1580      CTA 34px (por encima de la zona tapada)
1580–1920 zona tapada (respuesta, botón del anuncio) → solo fondo
```

- Márgenes laterales 72. Nada de texto fuera de 250…1580.
- En Reels: titular visible ≥ 1,5 s antes de cualquier movimiento (ver `brand-spec.json › motion.video`).

## carousel-4x5 · 1080×1350 por lámina, 3–8 láminas

- **Lámina 1:** remate (la promesa), logo completo.
- **Láminas 2…n−1:** una idea por lámina; titular 60–76px (heading); captura o dato; isotipo 56–64px abajo a la derecha;
  paginación «2/6» abajo a la izquierda (caption 20px).
- **Última:** cierre con CTA + logo completo.
- Mismos márgenes y misma posición del titular en todas las láminas (el ojo tiene que “pasar páginas”).
- Máximo una lámina oscura cada tres.

## slide-16x9 · 1920×1080

M = 120 (x) · 96 (y) · 12 columnas, gutter 32.

| Tipo de slide | Estructura |
|---|---|
| Portada | Remate 96–140px en 8 columnas, abajo a la izquierda; logo completo 320px arriba a la izquierda; fecha y nombre del colegio o evento en label |
| Índice | Números serif 64px + títulos sans 36px, filete entre ítems |
| Separador de sección | Fondo noche, número de sección en dorado `#EAB448`, título serif blanco |
| Texto | Heading 64–88px (≤ 6 palabras) + hasta 4 bullets de 30–36px; cuerpo mínimo 28px |
| Captura | Heading arriba en 5 columnas + captura en marco en 7 columnas que sangra a la derecha, pie debajo |
| Comparación | Dos columnas de 6: «Hoy» (tinta secundaria) vs «Con Gragica» (tinta + verde en el remate). Nunca contra un competidor con nombre |
| Cifra | `figure` 200–320px + label + fuente en caption |
| Chart | Ver `brand/visual/DATA_VISUALIZATION.md`; título que dice la conclusión («5° B bajó 0,8 puntos.») |
| Cita | Cita real 56–64px serif entre «», autor en label |
| Cierre / contacto | Remate + «Media hora por videollamada.» + `contacto@gragica.com` + WhatsApp |

Isotipo 40–48px abajo a la izquierda en todas menos la portada. Número de slide abajo a la derecha en caption.

## og-1200x630 (links compartidos)

M = 72/64. Logo arriba a la izquierda (200–220px). Titular serif 72–92px abajo a la izquierda, ≤ 7 palabras, con remate.
Sin captura: a ese tamaño se vuelve ruido. Fondo papel por defecto; noche para piezas de campaña.

## a4 · 210×297 mm (794×1123 px a 96 dpi)

- Márgenes de 20 mm. Impresión: sangrado de 3 mm y 300 dpi; nada importante a menos de 5 mm del corte.
- **Membrete:** lockup `ink-word` (G verde, palabra tinta) de 120–140px arriba a la izquierda; a la derecha, en label:
  fecha · destinatario. Un filete de 1px debajo.
- Título serif 28 pt (36–44px), subtítulo sans; cuerpo Source Sans 3 10,5 pt (13–14px), interlineado 1,5.
- Secciones numeradas «1.», «2.» en serif; tablas con filetes horizontales, sin bordes verticales y con cifras tabulares.
- Pie: «Gragica · Rosario, Argentina · gragica.com» + número de página en caption.
- **Co-branding (documento de un colegio):** el escudo del colegio manda arriba a la izquierda. Gragica va solo en el pie
  («Generado con Gragica»), con el isotipo de 12px en tinta.

## email-header · 600 px de ancho

Solo para mails **comerciales** de Gragica. Fondo papel, logo 120–140px, titular serif 36–44px con remate.
Los transaccionales los firma el colegio (`back/email_templates/`) y no se diseñan con esta skill.
