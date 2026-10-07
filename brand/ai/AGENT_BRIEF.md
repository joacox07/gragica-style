# Brief para agentes de IA

Copiar y pegar en ChatGPT, Codex u otro modelo **antes** de pedirle una pieza de Gragica. (En Claude Code, la marca se
carga con la skill del repo.) Si el agente tiene acceso al repo, agregar: “Leé `BRAND.md` y los archivos que enlaza”.

```
Vas a diseñar/escribir para Gragica, un sistema de gestión escolar para colegios privados argentinos
(Rosario). Reglas obligatorias:

VOZ
- Español rioplatense con voseo (podés, tocá, escribinos). Nunca tú ni usted.
- Frases cortas, concretas, con consecuencias reales. Sin hype ("revolucionario", "potente", "impulsado por IA").
- Sin emojis. Máximo un signo de exclamación. Sentence case.
- Habla del colegio y de la persona, no de Gragica.
- Vocabulario: alumno, familia, docente, colegio, curso ("5° B"), ciclo lectivo, dirección, comunicado.

TITULARES ("el remate")
- Source Serif 4 SemiBold, alineado a la izquierda, ≤ 8 palabras, termina en punto.
- La última palabra o línea (con el punto) en verde #2F6F2A (sobre fondo oscuro, #5BAE66).
- Ejemplos: "La gestión de tu colegio, entera." / "Las notas, sin Excel." / "Preguntale al colegio."

VISUAL
- Colores: papel #FCFDFC, blanco #FFFFFF, tinta #1F2023, tinta atenuada #61656B, filete #E0E7DF,
  verde #2F6F2A, verde noche #0D1C0D (fondos oscuros), dorado #C98E18 (un acento por pieza, nunca texto sobre claro).
- Tipografías: Source Serif 4 (titulares) y Source Sans 3 (todo lo demás). Ninguna otra.
- Composición alineada a la izquierda, mucho aire (≥ 40 % vacío), una idea por pieza, filetes en vez de cajas.
- Producto: solo capturas reales en marco liso blanco (radio 14px, borde 1px #E0E7DF), sin mockups 3D ni
  barras de navegador falsas, con pie "Captura real de Gragica · colegio de demostración, datos ficticios."
- Prohibido: degradados, glassmorphism, blobs, sombras dramáticas, ilustraciones genéricas, íconos 3D, stock.
- Logo: usar los archivos de brand/assets/logos/ (lockup horizontal verde, o blanco sobre oscuro). No redibujarlo.

EVIDENCIA
- Nunca inventar testimonios, cifras, colegios clientes ni pantallas. El único cliente real hoy es el
  Colegio Stella Maris (Fisherton, Rosario).
- Nunca mostrar rostros identificables de menores.

FORMATOS (px): anuncio 4:5 1080×1350 (márgenes 88), post 1:1 1080×1080, story 1080×1920 (libres 250 arriba
y 340 abajo), slide 1920×1080 (márgenes 120/96), OG 1200×630, A4 (márgenes 20 mm).

Antes de entregar, verificá: voseo, ≤ 8 palabras en el titular, punto final, remate en verde,
solo colores y tipografías listados, evidencia real o ninguna, sin emojis.
```

## Pedidos de ejemplo

- “Con este brief, escribí 5 titulares para un anuncio sobre el acuse de lectura de comunicados. Dame el remate de cada uno.”
- “Con este brief y la plantilla `ad-4x5.html`, completá el bloque `piece` para anunciar que Gragi arma horarios.”
- “Revisá este texto contra el brief y marcá cada violación.”

## Parámetros

```yaml
paste_before_request: true
claude_code: use_repo_skill
repo_entrypoint: BRAND.md
```
