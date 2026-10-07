# Producto (Nivel 1)

La interfaz de Gragica (web y Tauri) ya tiene su sistema de diseño. **La marca no lo duplica: lo referencia.**

| Qué | Dónde vive (fuente de verdad) |
|---|---|
| Tokens (color, radios, sombras, motion, escala tipográfica) | `packages/ui/src/styles/tokens.css` |
| Colores literales (gráficos, PDFs, mails, meta) | `packages/ui/src/lib/palette.ts` |
| Componentes (Button, Card, DataTable, Sheet, …) | `packages/ui/src/` (`@gragica/ui`) |
| Vitrina de componentes (solo dev) | `front/src/app/ds` |
| Color del colegio en runtime | `packages/core/src/color.ts` (`deriveAppThemeVars`) |
| Contrato responsive | `docs/CONTRATO-RESPONSIVE.md` + `e2e/responsive.spec.ts` |
| Guardas | `packages/ui/src/styles/__tests__/tokens.test.ts`, `scripts/redesign-grep.sh`, `e2e/audit/redesign.spec.ts` |
| Ayuda | `packages/app/src/help/catalog/` + `docs/ayuda.md` |
| Paridad web ↔ Tauri | `CLAUDE.md` § 2 |

## Qué aporta la marca al producto

1. **Voz:** todo string nuevo sigue [VOICE_AND_TONE](../verbal/VOICE_AND_TONE.md), [COPY_GUIDELINES](../verbal/COPY_GUIDELINES.md) y [VOCABULARY](../verbal/VOCABULARY.md).
2. **Silencio:** el producto es la marca en volumen bajo. Verde solo para la acción principal y el estado activo;
   el resto, tinta y papel.
3. **Momentos editoriales:** el saludo del Inicio y el título de un documento o comunicado pueden ir en Source Serif 4.
   Nunca controles, tablas, formularios ni menús.
4. **Logo en el chrome:** Gragica se queda en la barra (decisión 2026-10-07). El colegio aparece por color, login,
   membrete, PDFs y emails ([COBRANDING](COBRANDING.md)).
5. **Gragi:** botón flotante y panel del asistente; con la UI en `gragi.500 → gragi.800`.
6. **Datos:** [DATA_VISUALIZATION](../visual/DATA_VISUALIZATION.md).

## Lo que el producto NO toma del marketing

El remate verde en títulos de pantalla, las bandas verde noche, titulares serif grandes, capturas en marco,
motion editorial. Un dashboard no es un anuncio.

## Cambiar el producto

Todo cambio visual del producto sigue `CLAUDE.md` (tests, desktop/móvil, claro/oscuro, paridad, ayuda). Las
diferencias detectadas entre el producto y esta marca se registran aparte y **no se corrigen sin aprobación** de quienes mantienen el producto.

## Parámetros

```yaml
source_of_truth: packages/ui/src/styles/tokens.css
serif_allowed_in: [home_greeting, document_title, announcement_title]
serif_forbidden_in: [buttons, inputs, tables, menus, nav, forms, badges]
green_usage: [primary_action, active_state, brand_logo]
touch_target_px: 44
pointer_target_px: 24
min_viewport_px: 375
gutter_px: { mobile: 16, desktop: 24 }
container_px: 1200
chrome_logo: gragica
```
