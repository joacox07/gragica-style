# Niveles de expresión

Una sola marca, cuatro intensidades. El **núcleo** ([BRAND.md](../../BRAND.md#el-núcleo-que-nunca-cambia)) es fijo en
los cuatro. Lo que cambia es cuánto se usa cada recurso.

## Tabla de control

| Recurso | 1 · Producto | 2 · Institucional | 3 · Marketing | 4 · Campaña |
|---|---|---|---|---|
| **Dónde** | App web/Tauri, emails transaccionales, notificaciones | PDFs, membretes, propuestas, informes, docs, co-branding, firma de mail | gragica.com, social, anuncios, presentaciones comerciales | Campañas con nombre propio y fechas: inicio de ciclo lectivo, eventos, lanzamientos grandes |
| **Serif (Source Serif 4)** | Solo momentos editoriales: saludo del Inicio, título de un documento/comunicado. **Nunca** en controles. | Títulos y portada. | Titulares (el remate), cifras destacadas. | Libre: escala extrema, una palabra por pantalla. |
| **Sans (Source Sans 3)** | Todo. | Cuerpo, tablas, datos. | Bajadas, rótulos, CTAs. | Bajadas, rótulos. |
| **Remate en verde** | No. | Opcional en portada. | Obligatorio en el titular principal. | Obligatorio; puede ocupar toda la pieza. |
| **Proporción de color** (papel / tinta / verde / dorado) | 85 / 12 / 3 / 0 | 80 / 15 / 5 / 0–1 | 70 / 15 / 12 / 3 — o invertido sobre verde noche | Libre entre esos cuatro; verde noche a sangre permitido |
| **Verde noche de fondo** | No (solo video/medios). | Solo portada. | Bandas y piezas oscuras (máx. 1 de cada 3 piezas de una serie). | Sí, a sangre. |
| **Dorado** | Insignias de distinción. | Sello o filete puntual. | Un acento por pieza. | Un acento por pieza (puede ser grande). |
| **Imagen** | Datos del colegio (avatares, escudo). | Escudo del colegio, capturas. | Capturas reales en marco; foto documental cuando exista. | Foto protagonista, capturas, tipografía sola. |
| **Gragi (robot)** | Botón y panel del asistente. | **No.** | Solo en piezas sobre el asistente. | Sí, como personaje de campaña. |
| **Motion** | Funcional: 120/180/260 ms, una curva. | Ninguno. | Editorial: líneas que suben, crossfade de capturas. | Expresivo: cortes al ritmo, escalas grandes. Misma curva. |
| **Densidad** | Alta y ordenada (tablas, planillas). | Media (documento). | Baja: una idea por pieza, ≥ 40 % de aire. | Mínima: una frase. |
| **Libertad de layout** | Ninguna: componentes de `packages/ui`. | Retícula de documento. | Retículas de [LAYOUT](../visual/LAYOUT.md). | Romper la retícula con intención; márgenes de seguridad intactos. |

## Qué nunca cambia, ni en campaña

- El isotipo y el wordmark: proporciones, color y zona de resguardo.
- El verde `#2F6F2A`: no se reemplaza por otro verde “de campaña”.
- La familia Source: no hay tipografías invitadas.
- La voz: voseo, sin emojis, sin hype.
- La evidencia: ningún dato, testimonio ni pantalla inventada.
- Los pares de contraste prohibidos (`node scripts/brand/check-tokens.mjs` los lista).

## Qué sí puede hacer una campaña

- Usar una sola palabra en serif a 400px.
- Poner el verde noche a sangre y el remate en `#5BAE66`.
- Recortar una captura real muy de cerca (un número, una celda) como imagen principal.
- Mover el logo a un margen poco habitual (siempre con su zona de resguardo).
- Usar el dorado grande, como un sello.
- Usar a Gragi como personaje (sin recolorearlo).
- Tener un nombre propio (“Ciclo 2027”), escrito en la misma familia tipográfica.

## Cómo decidir el nivel

1. ¿Lo va a usar alguien para operar algo? → **1**.
2. ¿Lo va a firmar, archivar o imprimir un colegio? → **2**.
3. ¿Lo va a ver alguien que todavía no es cliente? → **3**.
4. ¿Tiene fecha de inicio y fin y un nombre propio? → **4**.

Si una pieza parece estar entre dos niveles, usá el **más bajo**.
