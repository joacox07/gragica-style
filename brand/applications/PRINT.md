# Documentos e impresión (Nivel 2)

Plantilla base: `brand/assets/templates/a4-doc.html` (A4, imprimible desde Chrome o renderizable a PNG/PDF).

## Especificaciones técnicas

| | Valor |
|---|---|
| Formato | A4 210×297 mm (Argentina usa A4; oficio solo si el colegio lo pide) |
| Márgenes | 20 mm; 25 mm del lado del anillado |
| Sangrado | 3 mm por lado cuando hay color a sangre |
| Zona segura | 5 mm adentro del corte |
| Resolución | 300 dpi en imágenes; logos siempre vectoriales (SVG/PDF) |
| Color | CMYK convertido por la imprenta; ver [COLOR § Impresión](../visual/COLOR.md#impresión) |
| Tipografía | Source Serif 4 (títulos) + Source Sans 3 (texto), embebidas en el PDF |
| Cuerpo mínimo | 9 pt texto, 8 pt notas |

## Documentos

| Documento | Estructura |
|---|---|
| **Carta / nota** | Lockup arriba izq. (25 mm de ancho), fecha a la derecha con interpunto, cuerpo en sans 10/15 pt, firma, pie con datos de contacto en caption. |
| **Propuesta comercial** | Portada (verde noche o papel, remate con el nombre del colegio), índice numerado, secciones con número en serif, precio en tabla con filetes, cierre con próximos pasos y fecha de validez. |
| **Informe** | Membrete, título serif, resumen en 3 líneas arriba, gráficos con titular-conclusión, anexos. |
| **Ficha** (alumno, colegio) | Tabla de dos columnas con filetes, rótulos en caption atenuada, datos en sans. |
| **Manual / documentación** | Columna de 6 de 6 en texto; pasos numerados; capturas en marco; «etiquetas» como en la ayuda. |
| **Certificado** | Papel blanco, mucho aire, nombre en serif grande centrado (la única composición centrada en documentos), filete dorado `#C98E18` de 1 pt, firmas. Si lo emite el colegio, va su escudo arriba y Gragica no aparece. |
| **Tarjeta personal** | 85×55 mm. Frente: lockup. Dorso: nombre en serif, cargo, mail, teléfono en sans. |
| **Credencial de evento** | 90×130 mm, isotipo grande, nombre en serif. |
| **Folleto** | A4 tríptico o A5: estructura B por panel, capturas en marco, un solo CTA. |
| **Cartel** | A3 / A2: estructura A, titular legible a 3 m (≥ 72 pt en A3). |

## Documentos del colegio hechos con Gragica

Boletines, informes de avance, comunicados impresos y actas son **del colegio**: llevan su membrete y Gragica no
aparece, o aparece en el pie como “Emitido con Gragica” en caption. Ver [COBRANDING](COBRANDING.md).

## Parámetros

```yaml
page: { format: A4, w_mm: 210, h_mm: 297, w_px_96dpi: 794, h_px_96dpi: 1123, margin_px_96dpi: 76 }
margin_mm: 20
margin_binding_mm: 25
bleed_mm: 3
safe_mm: 5
dpi: 300
type_pt: { title: 28, h2: 16, body: 10.5, body_leading: 15, table: 9, caption: 8, min: 8 }
logo_version: lockup-h-ink-word
logo_width_px_96dpi: [120, 140]
logo_width_mm: { letterhead: 25, cover: 60 }
business_card_mm: [85, 55]
badge_mm: [90, 130]
poster_a3_headline_min_pt: 72
certificate: { align: center, rule: { color: "#C98E18", pt: 1 } }
school_documents_gragica_mark: footer_caption_only
```
