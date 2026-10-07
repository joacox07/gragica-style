# Voz y tono

> La voz es el activo más maduro de Gragica: ya está en la ayuda (`docs/ayuda.md`), en Gragi
> (`back/src/agent/prompt/instructions.md`), en los emails (`back/email_templates/`) y en la landing.
> Este documento la fija para todo lo demás.

## La voz (no cambia)

1. **Voseo rioplatense.** “Podés”, “tocá”, “elegí”, “escribinos”. Nunca tú (“puedes”), nunca usted (“ingrese”).
2. **Frases cortas.** Una idea por frase. Si hay una coma de más, hay dos frases.
3. **Consecuencias concretas.** No “Acción irreversible”, sino “El mail y la notificación que ya salieron no se pueden retirar”.
4. **Franqueza.** Decimos lo que hacemos y lo que no. “Somos una plataforma joven: hoy trabajamos con un colegio.”
5. **Sin hype.** Nada de “revolucionario”, “potente”, “increíble”, “la mejor”, “next-gen”, “impulsado por IA”.
6. **Sin emojis.** Tampoco en redes. Símbolos permitidos: ✓ y ⚠ en producto, tablas y en el acuse “notificado ✓”; → solo en links de texto; ↓ en anclas.
7. **Casi sin exclamaciones.** Una por pieza como máximo y solo para celebrar algo real (“¡Listo!”).
8. **Sentence case.** “Nuevo ciclo lectivo”, no “Nuevo Ciclo Lectivo”.

## El tono (cambia según el momento)

| Momento | Tono | Ejemplo real o propuesto |
|---|---|---|
| **Venta** (landing, anuncio) | Seguro, concreto, con remate | “La gestión de tu colegio, entera.” |
| **Producto, tarea normal** | Directo, invisible | “Elegí el curso.” |
| **Producto, éxito** | Breve, sin festejo | “Ciclo lectivo creado.” |
| **Producto, error** | Calmo, dice qué pasó y qué hacer | “Tipo de archivo no válido. Usá .csv o .xlsx.” |
| **Acción destructiva** | Claro sobre la consecuencia | “¿Dar de baja el documento? Las familias dejan de verlo.” |
| **Seguridad y menores** | Serio, cálido, sin miedo | “Como sos menor de 18 años, la ley exige que una persona adulta de tu familia lo autorice.” |
| **Soporte** | Paciente, en pasos | “Tocá «Comunicados». Arriba a la derecha, «Nuevo».” |
| **Gragi** | Resolutivo, primero la respuesta | “Listo: 5° B tiene 3 alumnos con más de 10 faltas. ¿Les aviso a las familias?” |
| **Institucional** (propuesta, PDF) | Sobrio, en primera del plural | “Proponemos implementar Gragica en dos etapas.” |

## Tratamiento

- **A la persona:** vos. Siempre.
- **A la institución:** “tu colegio”, nunca “su institución educativa”.
- **Gragica habla de sí misma** en primera del plural (“trabajamos”, “te mostramos”), nunca en tercera de marketing
  (“Gragica ofrece soluciones…”).
- **Documentos legales** (términos, privacidad) usan tercera persona impersonal. Es la única excepción y vive en
  `legal/` y en `/terminos`, `/privacidad`.

## Suena a Gragica / no suena a Gragica

| ✅ Suena a Gragica | ❌ No suena a Gragica | Por qué |
|---|---|---|
| “Esto no es una maqueta.” | “Una experiencia de gestión de última generación.” | Evidencia contra adjetivos. |
| “Se termina la cadena de reenvíos por WhatsApp y el «no me llegó».” | “Optimizá la comunicación institucional.” | El problema con sus palabras reales. |
| “No pudimos guardar la nota. Revisá la conexión y volvé a intentar.” | “Error al guardar.” | Dice qué pasó y qué hacer. |
| “Todavía no hay comunicados. Cuando la dirección publique uno, aparece acá.” | “Sin resultados.” | El vacío explica. |
| “¿Eliminar a Juan Pérez de 5° B? Sus notas quedan en el historial.” | “¿Estás seguro de que deseás eliminar este registro? Esta acción no se puede deshacer.” | Concreto, sin formalismo híbrido. |
| “Gragi responde con los datos de tu colegio.” | “Nuestra IA de vanguardia transforma tus datos en insights.” | Qué hace, no qué es. |
| “Media hora por videollamada.” | “Agendá una demo personalizada con nuestro equipo de expertos.” | Concreto y corto. |
| “Una base de datos por colegio.” | “Seguridad de nivel bancario.” | Verificable contra comparación vacía. |
| “Elegí un rol.” | “Por favor, selecciona un rol.” | Voseo, sin “por favor” de formulario. |
| “Tenés mensajes sin leer.” | “Tienes un nuevo mensaje 📩” | Voseo, sin emoji. |

## Palabras y frases prohibidas

`revolucionar` · `transformar la educación` · `disruptivo` · `potente` · `robusto` · `de vanguardia` · `next-gen` ·
`impulsado por IA` / `AI-powered` · `soluciones` (como sustantivo genérico) · `experiencia` (como relleno) ·
`insights` · `seamless` · `todo en uno` · `el futuro de` · `¡Increíble!` · `sin precedentes` · `nivel bancario` ·
`ingrese` / `seleccione` / `usted` · `deseás` · `Por favor` (en producto).

## Gragi tiene su propia voz… dentro de la misma

Gragi habla con la voz de Gragica más dos cosas: **primera persona** (“lo armo”, “te pregunto antes de tocar nada”)
y **un poco más de calidez**. Nunca dice que algo está hecho si no se confirmó, nunca “le pide a la persona que
seleccione”, y rechaza lo que no es del colegio “en una sola frase amable”. Fuente canónica:
`back/src/agent/prompt/instructions.md`.
