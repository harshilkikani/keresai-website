// Spanish versions of the data that carries prose: stages, agents, Found
// items, the mocks, and the /go pages. Shapes match the English exports.
import type { Stage } from '../data/leaks';
import type { Agent, FoundService } from '../data/site';
import type { Transcript, Brief, AgentMock, SiteMock, ListingMock, Vertical } from '../data/mocks';
import type { GoPage } from '../data/go';
import type { GoWebsitePage } from '../data/goWebsite';

export const stages: Stage[] = [
  { n: 0, name: 'Que te encuentren', leak: 'Alguien a tres cuadras buscó exactamente lo que haces, y tu nombre no estaba en los resultados.', fix: 'Found pone debajo de todo lo demás un sitio web hecho para convertir, un Perfil de Negocio de Google administrado, reseñas reales y visibilidad en la búsqueda con IA.', by: 'Found', href: '/services/found' },
  { n: 1, name: 'Captar', leak: 'El teléfono sonó sin respuesta a las 7 pm y marcaron el siguiente nombre de la lista sin dejar mensaje.', fix: 'Remi contesta en dos timbres, 24/7, y responde por mensaje en 60 segundos todo lo que no pudo tomar.', by: 'Remi', href: '/agents/inbound' },
  { n: 2, name: 'Calificar', leak: 'Tomaste un recado. Un recado no es un contacto calificado, y mañana nadie recuerda qué querían.', fix: 'Remi sigue tu guion de admisión en la llamada (tipo de asunto, tipo de trabajo, urgencia, seguro) y lo deja por escrito.', by: 'Remi', href: '/agents/inbound#intake' },
  { n: 3, name: 'Agendar', leak: '"Alguien te devolverá la llamada" es donde mueren la mayoría de los contactos, y quien llama lo sabe al oírlo.', fix: 'Remi agenda en tu calendario y CRM mientras la persona sigue en la línea, y luego confirma por mensaje.', by: 'Remi', href: '/agents/inbound#booking' },
  { n: 4, name: 'Presentarse', leak: 'La cita quedó agendada y nadie apareció. Esa hora ya la habías pagado de todos modos.', fix: 'Theo confirma, recuerda, gestiona el cambio de fecha y rellena el espacio desde tu lista de espera.', by: 'Theo', href: '/agents/follow-up' },
  { n: 5, name: 'Cerrar', leak: 'Enviaste el presupuesto. Nadie lo persiguió. Cerró con quien les devolvió la llamada el jueves.', fix: 'Theo da seguimiento el día 1, el día 3 y el día 7 hasta que tengas un sí o un no.', by: 'Theo', href: '/agents/follow-up#estimates' },
  { n: 6, name: 'Volver', leak: 'Cientos de personas ya te eligieron una vez, y nadie ha hablado con ellas desde entonces.', fix: 'June reactiva la lista, revive los cerrados-perdidos y pide la reseña después de cada trabajo.', by: 'June', href: '/agents/reactivation' },
];

export const agents: Agent[] = [
  { slug: 'inbound', name: 'Remi', title: 'Agente de Entrada', intro: 'Remi, tu Agente de Entrada', searchTerm: 'recepcionista con IA', stage: 'Captar, calificar y agendar', job: 'Contesta cada llamada en dos timbres y agenda el contacto.',
    bullets: ['Contesta en dos timbres, 24/7: fuera de horario, fines de semana y cuando tu equipo ya está en otra línea.', 'Sigue tu guion de admisión, califica el contacto y agenda directo en tu calendario y CRM.', 'Responde por mensaje en 60 segundos cualquier llamada que no pudo tomar, y transfiere en caliente cuando alguien necesita a una persona.'], includedIn: 'Answer' },
  { slug: 'follow-up', name: 'Theo', title: 'Agente de Seguimiento', intro: 'Theo, tu Agente de Seguimiento', searchTerm: 'recordatorios de citas', stage: 'Presentarse y cerrar', job: 'Se asegura de que se presenten y digan que sí.',
    bullets: ['Confirma y recuerda por mensaje y por voz, gestiona el cambio de fecha y rellena el espacio desde tu lista de espera.', 'Recopila lo que necesitas antes de la cita (documentos, fotos, seguro) para que nadie llegue con las manos vacías.', 'Persigue el presupuesto el día 1, el día 3 y el día 7 hasta que tengas un sí o un no.'], includedIn: 'Convert' },
  { slug: 'reactivation', name: 'June', title: 'Agente de Reactivación', intro: 'June, tu Agente de Reactivación', searchTerm: 'reactivación de base de datos', stage: 'Volver', job: 'Trae de vuelta a los clientes que ya pagaste por conseguir.',
    bullets: ['Corre campañas de reactivación con clientes anteriores y los contactos fríos que ya están en tu CRM.', 'Revive los cerrados-perdidos: a quien dijo que no en los últimos seis a doce meses se le vuelve a preguntar, bien.', 'Pide la reseña después de cada trabajo o asunto, y te envía primero, en privado, a los que no quedaron contentos.'], includedIn: 'Grow' },
  { slug: 'outbound', name: 'Sol', title: 'Agente de Salida', intro: 'Sol, tu Agente de Salida', searchTerm: 'SDR con IA', stage: 'Pipeline nuevo', job: 'Prospección en frío que llega a la bandeja de entrada y agenda la reunión.',
    bullets: ['Entregabilidad bien hecha primero: SPF, DKIM, DMARC y un calentamiento real antes de un solo envío.', 'Secuencias personalizadas, respuestas atendidas en el hilo, reuniones agendadas en tu calendario.', 'Se vende al final a propósito: la mayoría de los negocios locales sacan más de June antes de necesitar a Sol.'], includedIn: 'Custom' },
];

export const foundServices: FoundService[] = [
  { name: 'Sitio web de conversión', desc: 'De cinco a ocho páginas en una plantilla hecha para tu sector, con clic para llamar, un widget de citas conectado a Remi, chat y SMS integrados, datos estructurados y un feed de reseñas en vivo. Cuota mensual fija: diseño, hosting y mantenimiento en un solo pago, sin costo de construcción en el nivel base.' },
  { name: 'Plan de mantenimiento web', desc: 'Actualizaciones, respaldos, seguridad, monitoreo de disponibilidad y velocidad, pequeñas ediciones de contenido y un reporte mensual que sí se lee.' },
  { name: 'Gestión del Perfil de Negocio de Google', desc: 'Optimización inicial (categorías, servicios, fotos, preguntas y respuestas, verificación) y luego publicaciones semanales, fotos nuevas, respuestas a reseñas, eliminación de fichas falsas y estadísticas mensuales.' },
  { name: 'Generación de reseñas y reputación', desc: 'Una solicitud de reseña automática después de cada trabajo o asunto, respuestas del dueño redactadas para tu aprobación, reseñas negativas interceptadas antes de publicarse y un reporte mensual de calificación.' },
  { name: 'Directorios y citaciones locales', desc: 'Un solo nombre, dirección y teléfono consistentes en Apple, Bing, Yelp, Nextdoor y Angi, más Avvo y FindLaw para bufetes o Healthgrades para consultorios.' },
  { name: 'Visibilidad en búsqueda con IA', desc: 'Datos estructurados, páginas de preguntas frecuentes y de servicios escritas para que las citen ChatGPT, las Vistas creadas con IA de Google y Perplexity, consistencia de entidad entre tu perfil, directorios y sitio, y un reporte mensual de si te citan para tu servicio cerca de tu ciudad.', addOn: true },
  { name: 'Configuración y respuesta de Local Services Ads', desc: 'Verificación, ficha y la garantía de siempre contestar. Google clasifica los Local Services Ads por qué tan rápido contestas y cómo te califican: Remi contesta en dos timbres.', addOn: true },
  { name: 'Rastreo y atribución de llamadas', desc: 'Un número de rastreo por canal (Perfil de Negocio de Google, Local Services Ads, tu sitio, tus anuncios) para que el resumen diario te diga qué fuente produjo cada cita agendada.' },
];

export const transcripts: Record<Vertical, Transcript> = {
  default: { label: 'Llamada de ejemplo — Remi', duration: '0:48', when: 'Mar 8:12 PM', from: '(555) 014-2207', city: 'Entrante · fuera de horario',
    turns: [
      { who: 'remi', t: '0:00', text: 'Gracias por llamar. Esta línea se contesta las 24 horas. ¿En qué puedo ayudarle?' },
      { who: 'caller', t: '0:04', text: 'Ah, pensé que a esta hora me iba a salir el buzón.' },
      { who: 'remi', t: '0:11', text: 'No le va a salir. ¿Qué está pasando?' },
      { who: 'caller', t: '0:16', text: 'Necesito que alguien venga mañana, si se puede.' },
      { who: 'remi', t: '0:22', text: 'Se puede. Tengo mañana en la mañana, de 8 a 10, o en la tarde, de 1 a 3. ¿Cuál le conviene?' },
      { who: 'caller', t: '0:30', text: 'En la mañana.' },
      { who: 'remi', t: '0:34', text: 'Agendado. Le envié la confirmación por mensaje y el dueño ya tiene los detalles.' },
    ],
    outcome: [{ k: 'Contestó en', v: '2 timbres' }, { k: 'Agendado', v: 'Mié 8–10 AM' }, { k: 'Dueño avisado', v: 'SMS, 8:13 PM' }] },
  'law-firms': { label: 'Llamada de admisión de ejemplo — Remi', duration: '1:12', when: 'Dom 9:41 PM', from: '(555) 013-8890', city: 'Cliente nuevo · fuera de horario',
    turns: [
      { who: 'remi', t: '0:00', text: 'Buenas noches, gracias por llamar. Esta línea se contesta 24/7. ¿En qué puedo ayudarle esta noche?' },
      { who: 'caller', t: '0:06', text: 'Me chocaron por detrás esta tarde en la Ruta 22. No sé ni si tengo un caso.' },
      { who: 'remi', t: '0:13', text: 'Lamento que haya pasado. Primero: ¿está lesionado y llegó la policía al lugar?' },
      { who: 'caller', t: '0:20', text: 'Me duelen el cuello y el hombro. Sí, hay un reporte.' },
      { who: 'remi', t: '0:27', text: 'Eso ayuda. Voy a tomar sus datos y los del otro conductor para que el bufete haga la verificación de conflictos antes de su consulta.' },
      { who: 'caller', t: '0:38', text: '¿Qué tan pronto puedo hablar con un abogado de verdad?' },
      { who: 'remi', t: '0:44', text: 'Mañana. Hay consulta a las 9:30 AM o a las 2:00 PM. ¿Cuál le sirve?' },
      { who: 'caller', t: '0:52', text: 'A las 9:30.' },
      { who: 'remi', t: '0:56', text: 'Agendado. Su resumen de admisión ya está en el expediente y el bufete lo tiene.' },
    ],
    outcome: [{ k: 'Consulta agendada', v: 'Lun 9:30 AM' }, { k: 'Verificación de conflictos', v: 'En cola para revisión' }, { k: 'Admisión del asunto', v: 'Guardada en Clio' }] },
  'home-services': { label: 'Llamada de emergencia de ejemplo — Remi', duration: '0:54', when: 'Vie 6:04 AM', from: '(555) 012-4416', city: 'Emergencia · antes de abrir',
    turns: [
      { who: 'remi', t: '0:00', text: 'Gracias por llamar. Puedo mandarle un técnico hoy mismo. ¿Qué está pasando?' },
      { who: 'caller', t: '0:05', text: 'Sin calefacción desde anoche. La casa está a 54 grados y tenemos un recién nacido.' },
      { who: 'remi', t: '0:12', text: 'Eso es una emergencia y la estoy marcando ahora. ¿Cuál es la dirección del servicio?' },
      { who: 'caller', t: '0:19', text: '412 Miller Road.' },
      { who: 'remi', t: '0:24', text: 'Listo. ¿Es la misma caldera para la que hicimos un presupuesto en primavera?' },
      { who: 'caller', t: '0:30', text: 'La misma.' },
      { who: 'remi', t: '0:34', text: 'Despachando al técnico de guardia con ventana de llegada de 8 a 10 esta mañana. Le va en camino el mensaje de confirmación.' },
    ],
    outcome: [{ k: 'Trabajo creado', v: 'Emergencia — sin calefacción' }, { k: 'Ventana de despacho', v: 'Vie 8–10 AM' }, { k: 'Guardado en', v: 'ServiceTitan' }] },
  'dental-med-spa': { label: 'Llamada de paciente de ejemplo — Remi', duration: '0:51', when: 'Lun 7:22 AM', from: '(555) 011-6035', city: 'Paciente existente · antes de abrir',
    turns: [
      { who: 'remi', t: '0:00', text: 'Buenos días. El consultorio abre a las ocho, pero puedo agendarle ahora. ¿Qué necesita?' },
      { who: 'caller', t: '0:06', text: 'Me rompí un diente con un pan esta mañana. Está filoso.' },
      { who: 'remi', t: '0:13', text: 'Vamos a atenderle hoy. ¿Ya es paciente con nosotros?' },
      { who: 'caller', t: '0:18', text: 'Sí, vine a una limpieza en primavera.' },
      { who: 'remi', t: '0:24', text: 'Encontré su expediente. También le toca el recall, así que lo anoto. Hay sillón a las 3:15 esta tarde.' },
      { who: 'caller', t: '0:35', text: 'Lo tomo.' },
      { who: 'remi', t: '0:39', text: 'Agendado a las 3:15. Le van los formularios por mensaje para que no los llene en el sillón.' },
    ],
    outcome: [{ k: 'Sillón', v: 'Hoy 3:15 PM' }, { k: 'Recall', v: 'Marcado — vencido' }, { k: 'Formularios', v: 'Enviados por SMS' }] },
  'real-estate': { label: 'Llamada de comprador de ejemplo — Remi', duration: '0:57', when: 'Sáb 11:38 AM', from: '(555) 010-3374', city: 'Consulta por propiedad · fin de semana',
    turns: [
      { who: 'remi', t: '0:00', text: 'Gracias por llamar. ¿Llama por alguna de las propiedades?' },
      { who: 'caller', t: '0:04', text: 'La de Hawthorne. ¿Sigue disponible?' },
      { who: 'remi', t: '0:09', text: 'Sí. ¿Ya trabaja con un agente?' },
      { who: 'caller', t: '0:14', text: 'No, apenas empiezo a buscar.' },
      { who: 'remi', t: '0:18', text: 'Entendido. ¿Tiene preaprobación y cuál es su plazo?' },
      { who: 'caller', t: '0:24', text: 'Preaprobado hasta 550, con la idea de mudarme en primavera.' },
      { who: 'remi', t: '0:31', text: 'Tengo una visita mañana a las 11. La agendo ahora y le envío las divulgaciones a su teléfono.' },
    ],
    outcome: [{ k: 'Visita agendada', v: 'Dom 11:00 AM' }, { k: 'Comprador', v: 'Preaprobado, sin agente' }, { k: 'Guardado en', v: 'Follow Up Boss' }] },
};

export const briefs: Record<Vertical, Brief> = {
  default: { when: 'Hoy 6:00 AM', heading: 'Ayer', lines: [{ tone: 'neutral', n: '23', text: 'llamadas contestadas' }, { tone: 'neutral', n: '9', text: 'contactos calificados' }, { tone: 'good', n: '6', text: 'citas agendadas' }, { tone: 'good', n: '2', text: 'ausencias evitadas' }, { tone: 'good', n: '1', text: 'reseña publicada' }, { tone: 'warn', n: '1', text: 'persona preguntó por ti' }], source: 'Mejor fuente: Perfil de Negocio de Google — 4 de 6 citas.', action: 'Devolver llamada: quien llamó a las 4:50 PM te quiere a ti, no a Remi.' },
  'law-firms': { when: 'Hoy 6:00 AM', heading: 'Ayer en el bufete', lines: [{ tone: 'neutral', n: '14', text: 'llamadas de admisión contestadas' }, { tone: 'neutral', n: '6', text: 'asuntos calificados' }, { tone: 'good', n: '4', text: 'consultas agendadas' }, { tone: 'good', n: '2', text: 'recordatorios confirmados' }, { tone: 'good', n: '1', text: 'reseña publicada' }, { tone: 'warn', n: '1', text: 'verificación de conflictos necesita a una persona' }], source: 'Mejor fuente: Local Services Ads — 3 de 4 consultas.', action: 'Revisar: el asunto de la Ruta 22 podría tener conflicto con un cliente existente.' },
  'home-services': { when: 'Hoy 6:00 AM', heading: 'Ayer en los teléfonos', lines: [{ tone: 'neutral', n: '31', text: 'llamadas contestadas' }, { tone: 'neutral', n: '12', text: 'trabajos calificados' }, { tone: 'good', n: '8', text: 'trabajos despachados' }, { tone: 'good', n: '3', text: 'presupuestos con seguimiento' }, { tone: 'good', n: '2', text: 'reseñas publicadas' }, { tone: 'warn', n: '1', text: 'trabajo sin técnico asignado' }], source: 'Mejor fuente: Perfil de Negocio de Google — 5 de 8 trabajos.', action: 'Asignar: la llamada sin calefacción de 8–10 AM en Miller Road necesita una camioneta.' },
  'dental-med-spa': { when: 'Hoy 6:00 AM', heading: 'Ayer en el consultorio', lines: [{ tone: 'neutral', n: '19', text: 'llamadas contestadas' }, { tone: 'neutral', n: '7', text: 'pacientes nuevos calificados' }, { tone: 'good', n: '6', text: 'sillones llenados' }, { tone: 'good', n: '4', text: 'recalls reagendados' }, { tone: 'good', n: '3', text: 'ausencias evitadas' }, { tone: 'warn', n: '2', text: 'sillones de hoy sin confirmar' }], source: 'Mejor fuente: campaña de recall — 4 de 6 sillones.', action: 'Confirmar: dos de los sillones de hoy no han respondido a los recordatorios.' },
  'real-estate': { when: 'Hoy 6:00 AM', heading: 'Ayer en la línea de propiedades', lines: [{ tone: 'neutral', n: '16', text: 'contactos contestados' }, { tone: 'neutral', n: '7', text: 'compradores calificados' }, { tone: 'good', n: '5', text: 'visitas agendadas' }, { tone: 'good', n: '2', text: 'visitas reconfirmadas' }, { tone: 'good', n: '1', text: 'reseña publicada' }, { tone: 'warn', n: '1', text: 'comprador quiere hacer una oferta' }], source: 'Mejor fuente: Zillow — 3 de 5 visitas.', action: 'Devolver llamada: el comprador de Hawthorne está listo para hacer una oferta.' },
};

export const agentMocks: AgentMock[] = [
  { slug: 'inbound', label: 'Ejemplo · llamada con Remi', kind: 'transcript', bubbles: [
    { who: 'them', t: '0:04', text: '¿Tienen a alguien que pueda venir esta noche?' },
    { who: 'agent', t: '0:09', text: 'Sí. ¿Cuál es la dirección del servicio, y hay alguien en la casa sin calefacción?' },
    { who: 'them', t: '0:16', text: '412 Miller Road. Aquí hay 54 grados.' },
    { who: 'agent', t: '0:21', text: 'Eso es un despacho de emergencia. Un técnico puede estar ahí entre 8 y 10 esta noche. ¿Lo agendo?' },
  ], outcome: 'Emergencia creada · ventana de despacho enviada · dueño avisado' },
  { slug: 'follow-up', label: 'Ejemplo · recordatorio de Theo', kind: 'sms', bubbles: [
    { who: 'agent', t: 'Ayer 4:02 PM', text: 'Hola Dana. Te recordamos que tu mantenimiento de calefacción es mañana, de 8 a 10 AM. Responde C para confirmar o R para cambiar la fecha.' },
    { who: 'them', t: 'Ayer 4:15 PM', text: 'C' },
    { who: 'agent', t: 'Ayer 4:15 PM', text: 'Confirmado. Te avisamos por mensaje cuando el técnico vaya en camino.' },
  ], outcome: 'Confirmado · riesgo de ausencia despejado · técnico avisado' },
  { slug: 'reactivation', label: 'Ejemplo · reactivación de June', kind: 'sms', bubbles: [
    { who: 'agent', t: 'Mar 10:10 AM', text: 'Hola Marcus, soy June de Northline. Dimos servicio a tu caldera hace dos inviernos. ¿Te reservamos un mantenimiento antes de que llegue el frío? Responde SÍ y te aparto un espacio.' },
    { who: 'them', t: 'Mar 11:48 AM', text: 'Sí, el jueves si se puede' },
    { who: 'agent', t: 'Mar 11:48 AM', text: 'El jueves de 1 a 3 PM es tuyo. Te va la confirmación.' },
  ], outcome: 'Cliente anterior reagendado · guardado en el CRM' },
  { slug: 'outbound', label: 'Ejemplo · respuestas de Sol', kind: 'inbox', inbox: [
    { from: 'Priya S.', subject: 'Re: Cobertura fuera de horario para el consultorio', preview: 'El martes a las 10 me sirve. Manda la invitación.', t: '9:41 AM', booked: true },
    { from: 'Daniel E.', subject: 'Re: Cobertura de admisión', preview: 'Ahora no, tal vez en el primer trimestre.', t: '8:55 AM' },
    { from: 'Alana R.', subject: 'Re: Llamadas perdidas en el bufete', preview: '¿Me mandas primero los precios?', t: 'Ayer' },
  ], outcome: 'Reunión agendada · Mar 10:00 AM · respuestas descartadas marcadas' },
];

export const siteMock: SiteMock = { name: 'Northline Heating & Air', tagline: 'Reparación el mismo día. Contestamos 24/7.', phone: '(555) 010-4400', services: ['Reparación de AC', 'Reparación de calefacción', 'Planes de mantenimiento', 'Instalaciones nuevas'], review: { text: 'Llamé a las 9 pm, el técnico llegó a las 8 am.', by: 'Reseña de ejemplo' }, badges: ['Sitio de ejemplo', 'Con licencia y seguro', 'Contestamos en 2 timbres'] };
export const siteMockText = { eyebrow: 'HVAC · Con licencia y seguro', sub: '¿Sin calefacción? ¿AC muerto? Una persona real te agenda en dos timbres, de día o de noche.' };
export const listingMock: ListingMock = { name: 'Northline Heating & Air', category: 'Contratista de HVAC', rating: '4.9', reviews: '212', hours: 'Abierto 24 horas', phone: '(555) 010-4400', area: 'Atiende el área metropolitana', note: 'Ficha de ejemplo' };
export const heroTail = { booking: { day: 'Mié', date: '18', time: '8:00–10:00 AM', what: 'Visita de servicio · 412 Miller Rd', where: 'Google Calendar' }, ownerText: { t: '8:13 PM', text: 'Remi: Agendado mié 8–10 AM para (555) 014-2207. Sin calefacción, 412 Miller Rd. Los detalles están en el CRM.' } };
export const writtenTo = 'Guardado en';

export const goSteps = [
  { n: '01', title: 'Pide una cotización, o llama', text: 'Veinte minutos por teléfono para mapear lo que pasa hoy cuando entra una llamada: quién contesta, qué se pregunta y dónde se detiene.' },
  { n: '02', title: 'Construimos tu sitio, tu ficha y tu guion de admisión', text: 'Tus servicios, tus horarios, tus precios, tus reglas de transferencia. Luego entran tu número, tu calendario y tu CRM.' },
  { n: '03', title: 'En marcha en cinco días hábiles', text: 'Primero lo llamas tú y lo ajustamos hasta que conteste como lo harías tú. Desde ahí, mes a mes.' },
];

export const goPages: GoPage[] = [
  { slug: '', path: '/es/go', title: 'Cada llamada contestada y agendada en cinco días | Keres AI', description: 'Un sitio web y una ficha de Google para que te encuentren, y Remi contestando cada llamada en dos timbres y agendándola. En cinco días, mes a mes, desde $249/mes.',
    h1: 'Cada llamada contestada y agendada. En marcha en cinco días.', lede: 'Un sitio web hecho para convertir y una ficha de Google administrada para que la búsqueda te encuentre; luego Remi, tu Agente de Entrada, contesta en dos timbres y agenda el trabajo antes de que cuelguen. Mes a mes.',
    facts: [{ k: 'Contesta en', v: '2 timbres' }, { k: 'En marcha en', v: '5 días' }, { k: 'Planes desde', v: '$249/mes' }],
    found: { title: 'Aparece donde ocurre la búsqueda.', text: 'Un sitio web hecho para convertir, un Perfil de Negocio de Google trabajado cada semana, reseñas que siguen llegando y directorios que coinciden entre sí. Alcance fijo, desde $249 al mes.' },
    answered: { title: 'Cada llamada contestada en dos timbres y agendada.', text: 'Remi contesta de día o de noche, sigue tu guion de admisión, ofrece disponibilidad real y escribe la cita en tu calendario y CRM antes de que cuelguen.' },
    mock: 'default', calc: 'home-services', close: { h2: 'Deja de perder las llamadas que ya pagaste.', text: 'Cotización en veinte minutos. En marcha en cinco días hábiles, mes a mes.' } },
  { slug: 'home-services', path: '/es/go/home-services', title: 'HVAC y plomería: llamadas fuera de horario agendadas | Keres AI', description: 'Las llamadas perdidas fuera de horario le cuestan el trabajo a las empresas de HVAC y plomería. Remi contesta cada llamada en dos timbres, clasifica la emergencia y agenda la ventana de despacho. En cinco días.',
    h1: 'Cada llamada fuera de horario contestada y agendada. En marcha en cinco días.', lede: 'La llamada sin calefacción a las 9 pm se la lleva quien contesta. Remi, tu Agente de Entrada, contesta en dos timbres, clasifica el trabajo, da una ventana de despacho y lo escribe en ServiceTitan o Jobber, mientras tú sigues en el techo. Mes a mes.',
    facts: [{ k: 'Contesta en', v: '2 timbres' }, { k: 'En marcha en', v: '5 días' }, { k: 'Found desde', v: '$249/mes' }],
    found: { title: 'Aparece cuando se muere la caldera.', text: 'Un sitio web de conversión, un Perfil de Negocio de Google trabajado cada semana, reseñas después de cada trabajo y Local Services Ads contestados en dos timbres. Desde $249 al mes.' },
    answered: { title: 'Emergencias clasificadas y despachadas, no al buzón.', text: 'Remi pregunta qué pasa, dónde y qué tan urgente es, da una ventana de llegada real y avisa al técnico de guardia. Los presupuestos se persiguen el día 1, 3 y 7.' },
    mock: 'home-services', calc: 'home-services', close: { h2: 'La próxima llamada fuera de horario vale todo el mes.', text: 'Cotización en veinte minutos. En marcha en cinco días hábiles, mes a mes.' } },
  { slug: 'law', path: '/es/go/law', title: 'Bufetes: llamadas de clientes nuevos contestadas y agendadas | Keres AI', description: 'El primer bufete que contesta firma al cliente. Remi contesta cada llamada de cliente nuevo en dos timbres, revisa conflictos, califica el asunto y agenda la consulta. En cinco días.',
    h1: 'Cada llamada de cliente nuevo contestada, revisada y en tu calendario. En marcha en cinco días.', lede: 'La mayoría de las llamadas con intención llegan fuera de horario y se las lleva el primer bufete que contesta. Remi, tu Agente de Entrada, contesta en dos timbres, toma los datos para la verificación de conflictos, califica el asunto según tu área de práctica y agenda la consulta. Mes a mes.',
    facts: [{ k: 'Contesta en', v: '2 timbres' }, { k: 'En marcha en', v: '5 días' }, { k: 'Found desde', v: '$499/mes' }],
    found: { title: 'Sé el bufete que aparece, y luego el que contesta.', text: 'Un sitio web de conversión, un Perfil de Negocio de Google administrado, reseñas después de cada asunto y directorios que coinciden en Avvo y FindLaw. Planes para bufetes desde $499 al mes.' },
    answered: { title: 'Admisión a las 2 a.m., datos de conflictos capturados, consulta agendada.', text: 'Remi revisa conflictos, califica el asunto, agenda la consulta y escribe la admisión en Clio, Lawmatics o HubSpot antes de que cuelguen.' },
    mock: 'law-firms', calc: 'legal', close: { h2: 'El primer bufete que contesta firma al cliente.', text: 'Cotización en veinte minutos. En marcha en cinco días hábiles, mes a mes.' } },
  { slug: 'dental', path: '/es/go/dental', title: 'Dental: cada llamada agendada, cada recall lleno | Keres AI', description: 'Remi contesta cada llamada de paciente en dos timbres, agenda el sillón y precalifica el seguro; Theo confirma para que el sillón no quede vacío. En cinco días.',
    h1: 'Cada llamada agendada. Cada recall lleno. En marcha en cinco días.', lede: 'El diente roto a las 7 am se agenda con quien contesta. Remi, tu Agente de Entrada, contesta en dos timbres, encuentra el expediente, agenda el sillón y envía los formularios por mensaje; Theo confirma la noche anterior para que el sillón no quede vacío. Mes a mes.',
    facts: [{ k: 'Contesta en', v: '2 timbres' }, { k: 'En marcha en', v: '5 días' }, { k: 'Found desde', v: '$249/mes' }],
    found: { title: 'Aparece en la búsqueda que empieza con un dolor de muela.', text: 'Un sitio web de conversión, un Perfil de Negocio de Google administrado, reseñas después de cada visita y directorios que coinciden en Healthgrades. Desde $249 al mes.' },
    answered: { title: 'Sillón agendado, recall lleno, ausencias evitadas.', text: 'Remi agenda la cita y precalifica seguro y procedimiento; Theo confirma y recuerda; June reagenda la lista de recall antes de que la higienista tenga un hueco.' },
    mock: 'dental-med-spa', calc: 'dental', close: { h2: 'Un sillón vacío cuesta lo mismo que uno lleno.', text: 'Cotización en veinte minutos. En marcha en cinco días hábiles, mes a mes.' } },
];

export const goWebsitePages: GoWebsitePage[] = [
  { slug: '', path: '/es/go/website', title: 'Un sitio web que agenda el trabajo, en 5 días | Keres AI', description: 'Un sitio web de conversión con clic para llamar y citas integradas, y tu ficha de Google administrada cada semana. $249/mes, sin costo de construcción, mes a mes, en marcha en cinco días.', vertical: 'negocios de servicios locales', industry: '', price: '$249' },
  { slug: 'home-services', path: '/es/go/website/home-services', title: 'Sitio web para HVAC y plomería que agenda el trabajo | Keres AI', description: 'Un sitio web hecho para empresas de HVAC y plomería: clic para llamar, citas integradas, tu ficha de Google administrada cada semana. $249/mes, sin costo de construcción, en marcha en cinco días.', vertical: 'empresas de HVAC y plomería', industry: 'home-services', price: '$249' },
  { slug: 'law', path: '/es/go/website/law', title: 'Sitio web para bufetes que agenda la consulta | Keres AI', description: 'Un sitio web hecho para bufetes: clic para llamar, agenda de consultas integrada, tu ficha de Google administrada cada semana. Planes para bufetes desde $499/mes, sin costo de construcción, en marcha en cinco días.', vertical: 'bufetes de abogados', industry: 'law', price: '$499' },
  { slug: 'dental', path: '/es/go/website/dental', title: 'Sitio web para consultorios dentales que agenda el sillón | Keres AI', description: 'Un sitio web hecho para consultorios dentales: clic para llamar, citas integradas, tu ficha de Google administrada cada semana. $249/mes, sin costo de construcción, en marcha en cinco días.', vertical: 'consultorios dentales', industry: 'dental', price: '$249' },
];

export const goWebsiteText = {
  eyebrow: 'Found: el sitio web y la ficha', h1: [['Un', 'sitio', 'web', 'que', 'agenda', 'el', 'trabajo.'], ['En', 'marcha', 'en', 'cinco', 'días.']],
  lede: 'Hecho para {vertical}, clic para llamar, citas integradas, tu ficha de Google administrada cada semana. {price}/mes. Sin costo de construcción. Mes a mes.',
  seeMyQuote: 'Ver mi cotización', getEyebrow: 'Qué recibes', getH2: 'Ocho cosas, una sola cuota.', addOn: 'Adicional',
  compareEyebrow: 'Cuánto cuesta', compareH2: 'Tres formas de tener un sitio que suene.',
  compare: [
    { who: 'Agencia local', cost: '$3,000–$8,000 por construirlo', then: 'más hosting, y los cambios se cobran por hora', time: 'De seis a doce semanas' },
    { who: 'Constructor DIY', cost: 'Tus noches', then: 'una plantilla que se ve como la de todos', time: 'Y sigue sin sonar' },
    { who: 'Keres Found', cost: '{price}/mes, sin costo de construcción', then: 'ficha de Google administrada cada semana', time: 'En marcha en cinco días', us: true },
  ],
  remi: 'Todo sitio Found viene listo para agendar con Remi. Agrega la contestación cuando quieras.',
  closeH2: 'Llámanos o agenda 20 minutos.', closeLede: 'Veinte minutos, sin presentación.',
};
