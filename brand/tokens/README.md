# Tokens de marca

Formato **DTCG** (Design Tokens Community Group, versión estable 2025.10): `$value`, `$type`, `$description`,
alias con `{grupo.token}`, colores como `{ colorSpace, components, hex }`.

| Archivo | Contenido |
|---|---|
| `primitive.tokens.json` | Valores crudos con nombre de lo que son: `color.green.700`, `color.paper.050`, `font.family.serif`, `dimension.radius.lg`, `duration.base`, `cubicBezier.standard`. |
| `semantic.tokens.json` | Para qué se usa cada uno: `color.brand.primary`, `color.surface.page`, `color.text.muted`, `color.status.error-text`. **Las piezas usan éstos.** |

No hay tokens de componente: los del producto viven en `packages/ui/src/styles/tokens.css`.

## Relación con el código

Cada primitivo que existe en el producto declara de dónde sale:

```json
"$extensions": { "com.gragica.source": { "css": "--color-primary", "mode": "light" } }
"$extensions": { "com.gragica.source": { "ts": "SERIES_LIGHT.0" } }
```

`node scripts/brand/check-tokens.mjs` resuelve el valor efectivo en `tokens.css` (con `--brand-hue` = 116, el verde de
Gragica sin colegio) y en `palette.ts`, y falla si difieren en más de 2/255 por canal. También valida los pares de
contraste documentados en [COLOR](../visual/COLOR.md#accesibilidad).

Los neutros del producto se tiñen en runtime con el tono del colegio (`packages/core/src/color.ts`); acá están
calculados para el tono por defecto.

## Consumir

- **Herramientas DTCG** (Style Dictionary 4+, Tokens Studio, Figma vía plugin) leen estos archivos directo.
- **Canva / Slides:** ver [CANVA_AND_SLIDES](../applications/CANVA_AND_SLIDES.md).
- **Agentes:** usar los semánticos por nombre; los hex están en el campo `hex`.
