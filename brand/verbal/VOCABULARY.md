# Vocabulario

Un término por concepto. La auditoría de `packages/core/src/locales/es.json` encontró mezclas
(alumno/estudiante, familias/padres, colegio/escuela); esta tabla decide.

## Personas y roles

| Usar | No usar | Nota |
|---|---|---|
| **alumno / alumna / alumnos** | estudiante, educando | “estudiante” aparece en strings viejos en tú. |
| **familia / familias** | padres (como genérico) | “Padres” excluye a madres, tutores y abuelas a cargo. Para el rol técnico, “familia”. |
| **padre, madre o tutor** | apoderado, responsable legal | Solo cuando importa el vínculo legal (consentimiento). |
| **tu hijo o hija**, **tus hijos** (hablándole a la familia) | el menor, el educando | Si se puede, escribir sin sujeto o con el nombre: “Juan tiene 2 libros prestados”. En marketing, “cada alumno”. |
| **docente / docentes** | profesor, profe (en UI) | “profe” se permite en voz de Gragi o de alumnos, no en etiquetas. |
| **preceptor / preceptora** | celador, auxiliar | Rol argentino real; no traducir. |
| **dirección** (la función), **director / directora** (la persona) | directivo (en UI), administración | “Directivos” sí en marketing B2B (“para directivos”). |
| **secretaría** | administración | |
| **personal del colegio** | staff, colaboradores | |
| **orientador/a / gabinete** | counselor | `counselor` es el nombre técnico del rol. |
| **bibliotecaria / bibliotecario** | librarian | |

## Institución y estructura

| Usar | No usar | Nota |
|---|---|---|
| **colegio** | escuela, institución, establecimiento | “Institución” solo en documentos legales. El prompt de Gragi dice “escuela”: deuda. |
| **nivel inicial / primario / secundario** | jardín (como nivel), EGB, polimodal | |
| **curso** | grado, división (sueltos) | Formato “5° B”, “Sala de 4 Estrella”. |
| **materia** | asignatura | |
| **ciclo lectivo** | año lectivo, año escolar | |
| **trimestre** / **cuatrimestre** / **etapa** | período | Según el colegio. |
| **boletín** | libreta, reporte de calificaciones | |
| **comunicado** | circular, notificación | “Notificación” es la del teléfono. |
| **acuse de lectura** | confirmación de lectura, read receipt | Remite al “notificado” del cuaderno de comunicados. |
| **inasistencia / falta** | ausencia (en UI) | “Ausencias docentes” se usa para personal. |
| **sanción** / **conducta** | amonestación (salvo que el colegio la use) | |

## Producto

| Usar | No usar | Nota |
|---|---|---|
| **Gragica** | GRAGICA, gragica, GraGica | Siempre mayúscula inicial y resto minúscula. “GRAGICA” solo en variables de entorno. |
| **Gragi** | GRAGI, el bot, la IA, chatbot | “el asistente” como genérico. |
| **la plataforma** / **el sistema** | la solución, el software | |
| **app** | aplicación móvil, APK | |
| **sitio del colegio** | landing del tenant, website | “tenant” nunca aparece ante usuarios. |
| **cuenta** | usuario (como objeto) | “Tu cuenta”, no “tu usuario”. |
| **consumo del asistente** | tokens IA, tokens | “Tokens” es jerga técnica (aparece en UI hoy: deuda). |
| **iniciar sesión / ingresar** | loguearse, login (en texto) | “Ingresar” en botones. |

## Verbos de interfaz

| Usar | No usar |
|---|---|
| **tocá** (táctil y general) | hacé clic, cliqueá, pulsá |
| **elegí** | seleccioná, escogé |
| **escribí** | ingresá (para texto libre) |
| **cargá** (notas, asistencia, archivos) | subí datos, ingresá datos |
| **mandá / enviá** | remití |
| **guardá** | grabá, salvá |

## Escritura de marca

- **Pronunciación y origen del nombre:** no están documentados en el repo. *Pendiente:* que los fundadores lo definan
  y lo agreguen acá (sirve para locuciones de video y para quien lo dice por primera vez en una reunión).
- En URL y mail: `gragica.com`, `contacto@gragica.com`.
- Nunca traducir el nombre ni agregarle sufijos (“Gragica App”, “Gragica Platform”).
