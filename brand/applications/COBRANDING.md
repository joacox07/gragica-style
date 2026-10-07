# Co-branding: Gragica × Colegio

## Principio

**El colegio es dueño de su identidad; Gragica es el marco.** El colegio llega con escudo, colores, nombre y
tradición. Gragica no los modifica nunca. Lo que cambia según el contexto es **cuánto** aparece cada uno.

## Cómo funciona hoy (hechos del código, b32b9b07)

| Superficie | Quién domina | Detalle |
|---|---|---|
| **Chrome de la app** (barra superior web, sidebar Tauri) | **Gragica** | Wordmark de Gragica siempre (`AppTopbar.tsx`, `AppBrand.tsx`). **Decisión 2026-10-07: se mantiene.** |
| **Color de la app** | **Colegio** | El color que el colegio elige tiñe primario y neutros (`packages/core/src/color.ts`). |
| **Login** | **Colegio** | Degradado/imagen y logo del colegio, título y subtítulo propios; “Hecho con [Gragica]” al pie. |
| **Comunicados** | **Colegio** | Membrete con escudo o monograma (`MessageLetterhead.tsx`, “nunca un logo de Gragica”). |
| **PDFs** (informes de avance, plantillas) | **Colegio** | `InstitutionalDocument.tsx`: logo y nombre del colegio. *Si el colegio no tiene logo, hoy cae al isotipo de Gragica: contradice la regla de arriba.* |
| **Emails** | **Colegio** | Banda con color y logo del colegio; pie “© Gragica”. |
| **Sitio del colegio** (`<slug>.gragica.com` o dominio propio) | **Colegio** | Sin “powered by” hoy. |
| **Avatar por defecto de usuarios** | Gragica | La G (`icon.jpg`): pendiente de revisar. |

## Reglas

### El escudo del colegio

- Se usa el archivo que provee el colegio, sin recolorear, recortar, redibujar ni “modernizar”.
- Nunca dentro de un círculo o forma que no tenga el original.
- Si el escudo tiene fondo, se respeta; si no se ve sobre un fondo, se pone sobre papel/blanco.
- Tamaño mínimo: 32px / 12 mm.

### El lockup conjunto

Cuando aparecen los dos al mismo nivel (propuesta, presentación conjunta, nota de prensa):

```
[Escudo del colegio]   │   [G Gragica]
```

- El colegio a la **izquierda** (se lee primero).
- Separador: filete vertical de 1px `#E0E7DF`, con 2u de aire a cada lado (u = altura de mayúscula del wordmark).
- Misma altura **óptica**: el escudo mide 1,4× la altura del lockup de Gragica (los escudos tienen mucho detalle).
- Gragica en verde sobre papel; en blanco sobre el color del colegio o sobre verde noche.

### “Con Gragica”

La firma cuando Gragica es infraestructura del colegio: login, pie de emails, pie de PDFs, pie del sitio.

- Texto: “Hecho con Gragica” (producto/login) o “Emitido con Gragica” (documentos). Caption, tinta atenuada.
- El wordmark puede reemplazar la palabra “Gragica” si mide ≥ 72px de ancho.
- Siempre al pie, nunca arriba del contenido del colegio.

### Colores

- En territorio del colegio, el color es del colegio. Gragica no impone su verde ahí.
- El verde de Gragica y el color del colegio no se mezclan en una misma zona (un botón verde en un login azul es un error).
- Si el color del colegio es verde parecido al de Gragica, se usa igual el del colegio.

### Screenshots comerciales

- Se usa el colegio de demostración con color de Gragica (hue 116), salvo que haya permiso escrito del colegio real.
- Con permiso, el escudo y el color reales pueden aparecer; los datos de alumnos, nunca.
- Pie: “Captura real de Gragica · [Colegio de demostración / Colegio X, con su autorización].”

## ✅ / ❌

| ✅ | ❌ |
|---|---|
| Login con el escudo y el color del colegio y “Hecho con Gragica” al pie | Logo de Gragica arriba del escudo del colegio en el login |
| Boletín con membrete del colegio | Boletín con la G como marca de agua |
| Lockup conjunto con filete y aire | Escudo y G pegados sin separador |
| Escudo original | Escudo “vectorizado” o recoloreado al verde de Gragica |
| Propuesta: portada con el nombre del colegio como remate (“Gragica para **Stella Maris.**”) | Usar el escudo de un colegio que no es cliente |

## Parámetros

```yaml
app_chrome_logo: gragica
school_dominant_surfaces: [login, announcements, pdf, email_header, school_site, enrollment_form]
joint_lockup:
  order: [school, gragica]
  separator: { width_px: 1, color: "#E0E7DF", gap_u: 2 }
  crest_height_ratio: 1.4
crest_min: { px: 32, mm: 12 }
signature:
  product: "Hecho con Gragica"
  documents: "Emitido con Gragica"
  position: footer
  style: caption_muted
  wordmark_min_width_px: 72
school_color_override: never
real_school_screenshots: written_permission_only
```
