# Rúbrica de autoevaluación

Antes de entregar, puntuá la pieza. Cada ítem vale los puntos indicados; los **bloqueantes (B)** valen 0 si fallan
y la pieza **no se entrega** hasta corregirlos, tenga el puntaje que tenga. Umbral: **≥ 90/100** y ningún B fallado.
Entregá la tabla completa, con una línea de evidencia por ítem («qué miré»).

| # | Criterio | Pts | Cómo se verifica |
|---|---|---|---|
| 1 | **B** · `lint-piece.mjs` da 0 errores | 10 | Salida del lint |
| 2 | **B** · Nada inventado: cada cifra, cita, colegio y pantalla es real o está declarada como demo | 10 | Brief › evidence + pie visible |
| 3 | **B** · Menores: ningún rostro identificable sin consentimiento | — | Mirar la imagen |
| 4 | Nivel correcto según `levelDecision` y recursos dentro de lo que ese nivel permite | 6 | Tabla de niveles del spec |
| 5 | Titular: una idea, ≤ máximo de palabras, punto final, habla del colegio o de la persona | 8 | Contar palabras |
| 6 | Remate: final del titular en verde, una sola zona verde en el titular | 6 | PNG |
| 7 | Jerarquía: se lee en este orden: remate → evidencia (o bajada, si es tipográfica) → firma, en < 5 s | 8 | Mirar el PNG al 25 % |
| 8 | Márgenes y safe zone respetados; nada se superpone ni queda cortado sin intención | 8 | PNG + spec › formats.safe |
| 9 | Tipos dentro de los rangos del formato; serif solo en display/heading/figure/numeral | 6 | CSS + PNG |
| 10 | Color: solo paleta; proporciones del nivel; ≤ 1 dorado; pares de contraste permitidos | 8 | Lint + PNG |
| 11 | Logo: versión correcta para el fondo, tamaño del formato, zona de resguardo libre | 6 | PNG |
| 12 | Evidencia bien tratada: captura en marco liso, pie «Captura real · datos ficticios», sin perspectiva. **Pieza tipográfica:** vale los 6 si no simula evidencia (ni gráfico decorativo, ni «pantalla» dibujada, ni cifra sin fuente) | 6 | PNG |
| 13 | Voz: voseo, sin hype, sin emojis, vocabulario de `VOCABULARY.md`, formatos de fecha/curso/número | 8 | Leer en voz alta |
| 14 | Aire: ≥ % mínimo del nivel; ≤ zonas densas permitidas | 5 | PNG |
| 15 | **Prueba del logo tapado:** tapando el logo, ¿se reconoce como Gragica? (≥ 4 del núcleo presentes) | 5 | Contar activos del núcleo |
| | **Total** | **100** | |

## Cómo contar el núcleo (ítem 15)

Presente = sí, visible en la pieza: ① la G · ② verde `#2F6F2A` · ③ papel + tinta (o noche) · ④ familia Source ·
⑤ remate · ⑥ evidencia real · ⑦ voz. Sin logo, se cuentan del ② al ⑦.

## Fallas típicas y cómo se corrigen

| Síntoma | Corrección |
|---|---|
| La captura tapa la firma | Fijá alto al marco y `object-fit: cover; object-position: left top` |
| El titular no entra en el máximo de palabras | Sacá adjetivos; el sustantivo concreto va al remate |
| Todo se ve “SaaS genérico” | Falta el remate o la evidencia; sobran tarjetas. Máximo 3 tarjetas por pieza |
| Se ve vacío | Subí el titular al máximo del rango; no agregues decoración |
| Mucho verde | El verde es para el remate, el eyebrow y el CTA; el resto, tinta |
| Fondo noche ilegible | El remate va `#5BAE66`, no `#2F6F2A`; la bajada `#CAD8CA` |
