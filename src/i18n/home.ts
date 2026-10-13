// Homepage copy in both languages. Prices and names come from the data
// files; only prose lives here.
import type { Locale } from './index';
import { priceFrom } from '../config/business';
import { ROLLING_OUT_INTEGRATIONS } from '../data/integrations';

export const home = {
  en: {
    title: 'Websites & AI Receptionist for Local Businesses | Keres AI',
    whatIs: { h2: 'What is Keres AI?', text: 'Keres AI builds and runs websites and Google Business Profiles for local service businesses (Found, from $249/month; $499 for law firms) and answers their calls with Remi, the Keres AI receptionist, which picks up in two rings, 24/7, books into Google Calendar, HubSpot or ServiceTitan, and texts back missed callers within 60 seconds. Remi answers in English only today. Everything is month-to-month, and Keres sets it up for you.' },
    remiHow: { h2: 'How does Remi answer and book a call?', lede: 'Remi by Keres AI answers your business line in two rings, 24/7, in English. Remi asks the intake questions you approve, such as the system type and symptoms on an HVAC call or the practice area on a law-firm call.', body: 'Remi then checks real availability and books the appointment into Google Calendar, HubSpot or ServiceTitan while the caller is still on the line; other tools connect through Zapier. Calls your rules mark as urgent go to your on-call person. If a call is missed, Remi texts the caller back within 60 seconds. Remi also answers website chat, your text line and website form enquiries with the same script. Billing is one monthly rate with included minutes, then per minute, with no per-call fees, quoted to your call volume and month-to-month.', cta: 'How Remi works' },
    description: 'A website and a managed Google profile so local customers find you, and Remi answering every call in two rings, 24/7. Month-to-month, from $249/month.',
    eyebrow: 'AI workers for local businesses',
    h1: [['Get', 'found.'], ['Get', 'answered.'], ['Get', 'booked.']],
    lede: 'Keres AI gets local service businesses found and answered: Found runs your website and Google profile, and Remi, Keres AI’s AI receptionist, picks up every call in two rings. Hire one worker or all six; each reports to you in a text every morning{bundle}. Month-to-month.',
    facts: [['Answers in', '2', ' rings'], ['Texts back in', '60', ' seconds']], factBundle: ['Bundles from', '/mo'],
    ledeBundle: ', and starts from {price}/mo', hearRemi: '— hear Remi answer',
    atAGlance: 'At a glance', getAQuote: 'Get a quote', call: 'Call',
    board: {
      head: 'Tonight’s shift · six workers', when: 'Tue 8:12 PM', example: 'Example', foot: 'All of it in one text at 7 am.',
      caption: 'Example shift, not a customer’s. Each row is the job that worker does.',
      rows: [
        ['found', 'Found', 'Website, listing, reviews', 'Site live · listing post published · 2 review replies for your OK', false],
        ['inbound', 'Remi', 'Answers and books', 'On a call · (555) 014-2207 · no heat, booked Wed 8–10', true],
        ['follow-up', 'Theo', 'Confirms, reminds, chases', 'Tomorrow’s 6 visits confirmed · 1 reschedule handled', false],
        ['reactivation', 'June', 'Brings them back', '4 review requests sent · 1 posted · 2 tune-ups rebooked', false],
        ['outbound', 'Sol', 'Finds new customers', 'Warm-up day 12 of 28 · sequence starts after', false],
        ['custom', 'Custom', 'Your own job', 'Weekly report drafted · waiting for your OK', false],
      ],
      remiGated: 'On a call · (555) 014-2207 · answering in English today',
    },
    roster: {
      eyebrow: 'The roster', h2: 'Six workers. Hire one, hire all.',
      hire: 'Hire {name}', from: 'from', perMo: '/mo', foot: 'Hire one, hire all, add your own.', footBundle: ' Bundles from {price}/mo.',
      scope: { head: 'Scope card', example: 'Example', rows: [['Job', 'Reply to every review within an hour'], ['Reports to', 'You, in the 7 am text'], ['Runs', 'Every hour, seven days'], ['Approves', 'You, by exception']] },
    },
    doors: {
      hidden: 'Two ways in: be found, be answered',
      found: { eyebrow: 'Be Found', title: 'Show up where the search happens.', text: 'A website built to convert, a Google Business Profile worked every week, reviews that keep arriving, listings that agree with each other, and content AI search will quote. Fixed scope, from {price} a month.', cta: 'What Found includes' },
      answered: { eyebrow: 'Be Answered', title: 'Every call answered in two rings and booked.', text: 'Remi, your Inbound Agent, picks up day or night, runs your intake script, offers real availability and writes the appointment to your calendar and CRM before the caller hangs up.', from: ' From {price} a month.', cta: 'What Remi does' },
    },
    leaks: { eyebrow: 'Where your pipeline leaks', h2: 'One pipeline. Seven places money falls out of it.', lede: 'Get found, capture the lead, qualify it, book it, get them to show, close it, bring them back. Nobody loses a customer in one dramatic moment — it happens at one of these seven stages, and every one of them is a job nobody in a five-person firm has time to do.', handledBy: 'Worker:' },
    team: { eyebrow: 'Be Answered — the team', h2: 'Three workers. One phone number.', lede: 'One system that answers the call, remembers it, and keeps working it after everyone has gone home. On your line they introduce themselves with whatever name you choose.', what: 'What {name} does' },
    found: { eyebrow: 'One worker, eight jobs', h2: 'What does Keres AI’s Found include?', lede: 'A website built to book the job, a Google listing worked every week, and reviews that keep arriving: everything that has to be true before your phone rings. Eight jobs, one worker, one monthly fee{price}.', body: 'Each month, Found by Keres AI hosts and maintains a website of five to eight pages built for your trade, posts to your Google Business Profile every week, drafts review replies for your approval, and sends the same review request to every customer after each job. Found also keeps your name, address and phone the same on Apple, Bing, Yelp, Nextdoor and your trade directories, and sends a monthly report you can read. Found starts at $249 a month ($499 for law firms), month-to-month, with no build fee at the base tier. AI search visibility and Local Services Ads setup are add-ons.', priceClause: ', {from} a month', from: 'from $', per: '/month · quoted to your volume', cta: 'What Found does', addOn: 'Add-on' },
    brief: { eyebrow: 'Owner Daily Brief', h2: 'You don’t log into a dashboard. You get a text.', lede: 'Every worker reports to the same text.', body: 'Green is money that stayed. Amber is the one item waiting on you. If nothing is waiting on you, there is no amber line.' },
    industries: {
      eyebrow: 'Who it is for', h2: 'Which businesses is Keres AI built for?', lede: 'Keres AI is built for local service businesses in four groups: home services such as HVAC, plumbing and roofing; law firms; dental practices and med spas; and real estate agents. A conflict check is not an intake form and chair time is not an appointment, so Remi’s script uses the vocabulary and the questions your business actually asks.',
      items: [
        ['/industries/law-firms', 'Law firms', 'Remi answers new-client calls in two rings, even at 2 a.m., runs intake by practice area, collects the names for your conflict check and books the consultation into Google Calendar or HubSpot.'],
        ['/industries/home-services', 'Home services', 'Remi sorts emergency jobs by your rules, offers a dispatch window on the call and books into ServiceTitan; Theo chases open estimates until they close.'],
        ['/industries/dental-med-spa', 'Dental & med spa', 'Chair time filled from the cancellation list, recall rebooked, no-shows headed off the night before.'],
        ['/industries/real-estate', 'Real estate', 'Remi answers listing calls on a Saturday, asks about pre-approval and timeline, and books the showing into Google Calendar or HubSpot while you are in the car.'],
      ],
      foot: 'Five more specific pages, for HVAC, plumbing, roofing, septic and towing, sit under', footLink: 'all industries',
    },
    integrations: { eyebrow: 'Integrations', h2: 'Which calendars and CRMs does Keres AI connect to?', lede: 'A booking that lives only inside our software is not a booking. Remi writes to the tools your team already opens every morning.', aria: 'Connected today', foot: `Connected today. ${ROLLING_OUT_INTEGRATIONS} are rolling out and not live yet; ask where yours is.`, footLink: 'See all integrations' },
    customTeaser: { eyebrow: 'Custom workers', h2: 'Need a job done that isn’t on this page?', text: 'We build one-job agents for the recurring work nobody on your team has time for. Fixed build price, monthly run fee, first version in two weeks.', cta: 'See custom agents' },
    calc: { eyebrow: 'Missed-call calculator', h2: 'How much are missed calls costing you?', lede: 'Four inputs and the arithmetic shown in full, because a number you cannot check is not worth having. Pick your industry and it loads typical figures to start from.', link: 'Open the full calculator' },
    proof: { eyebrow: 'Proof', h2: 'In their words, or not at all.' },
    start: {
      eyebrow: 'How it starts', h2: 'How long does it take to get started?',
      steps: [
        ['Call us, or book 30 minutes', 'Keres AI starts with a 30-minute call. We map what happens today when your phone rings: who answers, what gets asked and where leads stop. You leave with a quote for Found (from $249 a month, $499 for law firms) and for Remi (a monthly rate with included minutes, then per minute). The office line, (973) 495-2223, is answered by a person.'],
        ['We build your site, your listing and your intake script', 'Your services, your hours, your prices, your handoff rules. Then your number, calendar and CRM go in.'],
        ['You test it, then it goes live', 'You call it yourself first and keep tuning until it answers the way you would. Timing depends on your call flows and integrations, and we agree it on the first call. Month-to-month from there, and the Daily Brief starts the next morning.'],
      ],
    },
    faq: {
      eyebrow: 'Questions', h2: 'The questions everyone asks first.',
      items: [
        ['How much does Keres AI cost?', 'Found — the website, Google listing, reviews and listings layer — starts at $249/month, $499/month for law firms. Remi, the AI receptionist, {answerCost}: a monthly rate with included minutes, then per minute, no per-call fees. Every worker is month-to-month with no cancellation fee; to cancel, give 30 days’ written notice. <a href="/pricing">See what changes the quote</a>.'],
        ['Do I have to buy the whole team?', 'No. You can start at one door: Found if nobody can find you, Remi if the phone is the leak. Add the next stage once that one is working, or buy Found on its own and keep answering calls yourself.'],
        ['What if a caller needs a human?', 'Remi hands off. You set the rules — an emergency, a named client, anyone who asks for a person — and the call warm-transfers to your on-call number. If nobody picks up, you get a "call me now" alert with everything Remi already collected, so the caller never repeats themselves.'],
        ['How long does setup take?', 'It depends on your call flows and integrations. Day one is a 30-minute call to map how you answer now; then Keres writes your intake script and connects your number, calendar and CRM. We agree the timing on that first call, and you test Remi yourself before it answers a customer.'],
        ['Is there a contract?', 'No long-term contract. Every plan is month-to-month, there is no build fee on the Found base tier, and you can change plans any month or cancel with 30 days’ written notice.'],
        ['Does it sound like a robot?', 'It sounds like a competent front desk. Remi answers in two rings, uses your vocabulary — consult, job, chair time, showing — and says "let me get someone for you" rather than guessing when it does not know. <a href="/hear-it">Hear sample calls</a>, or ask for a live test call when we talk.'],
      ],
      answerCostWith: 'starts at {price}/month', answerCostWithout: 'is quoted to your call volume',
    },
    close: { h2: 'Call the number and listen to Remi answer.', h2NoPhone: 'Hear Remi answer before you decide.', lede: 'It is the same agent your callers would get. Ask it something awkward — that is the point of the exercise. Found from {found}/month', remi: '; Remi from {price}/month' },
  },
  es: {
    title: 'Trabajadores de IA para negocios locales | Keres AI',
    whatIs: { h2: '¿Qué es Keres AI?', text: 'Keres AI crea y administra sitios web y Perfiles de Negocio de Google para negocios de servicios locales (Found, desde $249/mes; $499 para bufetes) y contesta sus llamadas con Remi, el recepcionista con IA de Keres AI, que contesta en dos timbres, las 24 horas, agenda en Google Calendar, HubSpot o ServiceTitan y responde por mensaje de texto a las llamadas perdidas en menos de 60 segundos. Hoy Remi contesta llamadas solo en inglés. Todo es mes a mes y Keres lo configura por ti.' },
    remiHow: { h2: '¿Cómo contesta y agenda Remi una llamada?', lede: 'Remi by Keres AI contesta la línea de tu negocio en dos timbres, las 24 horas, en inglés. Remi hace las preguntas de admisión que tú apruebas, como el tipo de equipo y los síntomas en una llamada de HVAC o el área de práctica en una llamada a un bufete.', body: 'Luego Remi revisa la disponibilidad real y agenda la cita en Google Calendar, HubSpot o ServiceTitan mientras la persona sigue en la línea; otras herramientas se conectan con Zapier. Las llamadas que tus reglas marcan como urgentes van a tu persona de guardia. Si se pierde una llamada, Remi le escribe por texto en menos de 60 segundos. Remi también contesta el chat del sitio web, tu línea de texto y los formularios del sitio con el mismo guion. Se cobra una tarifa mensual con minutos incluidos y luego por minuto, sin cargos por llamada, cotizada según tu volumen de llamadas y mes a mes.', cta: 'Cómo funciona Remi' },
    description: 'Un sitio web hecho para convertir y una ficha de Google administrada para que aparezcas, y Remi contestando cada llamada en dos timbres para que se agende. Mes a mes, desde $249/mes.',
    eyebrow: 'Trabajadores de IA para negocios locales',
    h1: [['Que', 'te', 'encuentren.'], ['Que', 'te', 'contesten.'], ['Que', 'te', 'reserven.']],
    lede: 'Keres AI hace que a los negocios de servicios locales los encuentren y les contesten: Found administra tu sitio web y tu ficha de Google, y Remi, el recepcionista con IA de Keres AI, contesta cada llamada en dos timbres. Contrata un trabajador o los seis; cada uno te reporta cada mañana por mensaje de texto{bundle}. Mes a mes.',
    facts: [['Contesta en', '2', ' timbres'], ['Responde por texto en', '60', ' segundos']], factBundle: ['Paquetes desde', '/mes'],
    ledeBundle: ', y empieza desde {price}/mes', hearRemi: '— escucha a Remi contestar',
    atAGlance: 'De un vistazo', getAQuote: 'Pedir cotización', call: 'Llamar',
    board: {
      head: 'Turno de esta noche · seis trabajadores', when: 'Mar 8:12 PM', example: 'Ejemplo', foot: 'Todo en un solo mensaje a las 7 am.',
      caption: 'Turno de ejemplo, no de un cliente. Cada fila es la tarea de ese trabajador.',
      rows: [
        ['found', 'Found', 'Sitio web, ficha, reseñas', 'Sitio en línea · publicación en la ficha lista · 2 respuestas a reseñas esperan tu OK', false],
        ['inbound', 'Remi', 'Contesta y agenda', 'En llamada · (555) 014-2207 · sin calefacción, agendado mié 8–10', true],
        ['follow-up', 'Theo', 'Confirma, recuerda, persigue', '6 visitas de mañana confirmadas · 1 cambio de hora resuelto', false],
        ['reactivation', 'June', 'Los trae de vuelta', '4 solicitudes de reseña enviadas · 1 publicada · 2 mantenimientos reagendados', false],
        ['outbound', 'Sol', 'Consigue clientes nuevos', 'Calentamiento día 12 de 28 · la secuencia empieza después', false],
        ['custom', 'Custom', 'Tu propia tarea', 'Reporte semanal redactado · espera tu OK', false],
      ],
      remiGated: 'En llamada · (555) 014-2207 · hoy contesta en inglés',
    },
    roster: {
      eyebrow: 'El equipo', h2: 'Seis trabajadores. Contrata uno o contrátalos todos.',
      hire: 'Contratar {a}{name}', from: 'desde', perMo: '/mes', foot: 'Contrata uno, contrátalos todos o agrega el tuyo.', footBundle: ' Paquetes desde {price}/mes.',
      scope: { head: 'Ficha de alcance', example: 'Ejemplo', rows: [['Tarea', 'Responder cada reseña en menos de una hora'], ['Reporta a', 'Ti, en el mensaje de las 7 am'], ['Corre', 'Cada hora, los siete días'], ['Aprueba', 'Tú, por excepción']] },
    },
    doors: {
      hidden: 'Dos puertas: que te encuentren, que te contesten',
      found: { eyebrow: 'Que te encuentren', title: 'Aparece donde ocurre la búsqueda.', text: 'Un sitio web hecho para convertir, un Perfil de Negocio de Google trabajado cada semana, reseñas que siguen llegando, directorios que coinciden entre sí y contenido que la búsqueda con IA va a citar. Alcance fijo, desde {price} al mes.', cta: 'Qué incluye Found' },
      answered: { eyebrow: 'Que te contesten', title: 'Cada llamada contestada en dos timbres y agendada.', text: 'Remi, tu Agente de Entrada, contesta de día o de noche, sigue tu guion de admisión, ofrece disponibilidad real y escribe la cita en tu calendario y CRM antes de que cuelguen.', from: ' Desde {price} al mes.', cta: 'Qué hace Remi' },
    },
    leaks: { eyebrow: 'Dónde se fuga tu pipeline', h2: 'Un solo pipeline. Siete lugares por donde se escapa el dinero.', lede: 'Que te encuentren, captar el contacto, calificarlo, agendarlo, que se presente, cerrarlo, que vuelva. Nadie pierde un cliente en un momento dramático: pasa en una de estas siete etapas, y cada una es un trabajo que nadie en un negocio de cinco personas tiene tiempo de hacer.', handledBy: 'Trabajador:' },
    team: { eyebrow: 'Que te contesten: el equipo', h2: 'Tres trabajadores. Un solo número.', lede: 'Un solo sistema que contesta la llamada, la recuerda y la sigue trabajando cuando ya todos se fueron a casa. En tu línea se presentan con el nombre que tú elijas.', what: 'Qué hace {name}' },
    found: { eyebrow: 'Un trabajador, ocho tareas', h2: '¿Qué incluye Found de Keres AI?', lede: 'Un sitio web hecho para agendar el trabajo, una ficha de Google trabajada cada semana y reseñas que siguen llegando: todo lo que tiene que estar en orden antes de que suene tu teléfono. Ocho tareas, un trabajador, una sola cuota mensual{price}.', body: 'Cada mes, Found by Keres AI aloja y mantiene un sitio web de cinco a ocho páginas hecho para tu sector, publica en tu Perfil de Negocio de Google cada semana, redacta respuestas a reseñas para tu aprobación y envía la misma solicitud de reseña a cada cliente después de cada trabajo. Found también mantiene tu nombre, dirección y teléfono iguales en Apple, Bing, Yelp, Nextdoor y los directorios de tu sector, y envía un reporte mensual que se entiende. Found empieza en $249 al mes ($499 para bufetes), mes a mes, sin costo de construcción en el nivel base. La visibilidad en búsqueda con IA y la configuración de Local Services Ads son adicionales.', priceClause: ', {from} al mes', from: 'desde $', per: '/mes · cotizado a tu volumen', cta: 'Qué hace Found', addOn: 'Adicional' },
    brief: { eyebrow: 'Resumen diario del dueño', h2: 'No entras a un panel. Recibes un mensaje.', lede: 'Todos los trabajadores reportan al mismo mensaje.', body: 'Verde es dinero que se quedó. Ámbar es lo único que te espera. Si nada te espera, no hay línea ámbar.' },
    industries: {
      eyebrow: 'Para quién es', h2: '¿Para qué negocios está hecho Keres AI?', lede: 'Keres AI está hecho para negocios de servicios locales en cuatro grupos: servicios para el hogar como HVAC, plomería y techos; bufetes de abogados; consultorios dentales y med spas; y agentes de bienes raíces. Una verificación de conflictos no es un formulario de admisión y el tiempo de sillón no es una cita, así que el guion de Remi usa el vocabulario y las preguntas que tu negocio realmente hace.',
      items: [
        ['/industries/law-firms', 'Bufetes de abogados', 'Una llamada de cliente nuevo a las 2 a.m., los nombres para tu verificación de conflictos recopilados, el asunto calificado, la consulta en el calendario antes de que abras.'],
        ['/industries/home-services', 'Servicios para el hogar', 'Emergencias clasificadas, ventana de despacho dada en la llamada, presupuestos perseguidos hasta que cierran.'],
        ['/industries/dental-med-spa', 'Dental y med spa', 'Tiempo de sillón llenado desde la lista de cancelaciones, recall reagendado, ausencias evitadas la noche anterior.'],
        ['/industries/real-estate', 'Bienes raíces', 'Llamadas por propiedades contestadas un sábado, compradores calificados, visitas agendadas sin que estés en el carro.'],
      ],
      foot: 'Cinco páginas más específicas (HVAC, plomería, techos, sépticos y grúas) están bajo', footLink: 'todas las industrias',
    },
    integrations: { eyebrow: 'Integraciones', h2: '¿Con qué calendarios y CRM se conecta Keres AI?', lede: 'Una cita que solo vive dentro de nuestro software no es una cita. Remi escribe en las herramientas que tu equipo ya abre cada mañana.', aria: 'Conectadas hoy', foot: `Conectadas hoy. ${ROLLING_OUT_INTEGRATIONS} están en camino y aún no funcionan: pregunta por la tuya.`, footLink: 'Ver todas las integraciones' },
    customTeaser: { eyebrow: 'Trabajadores a medida', h2: '¿Necesitas una tarea que no está en esta página?', text: 'Construimos agentes de una sola tarea para el trabajo recurrente que nadie en tu equipo tiene tiempo de hacer. Precio fijo de desarrollo, cuota mensual, primera versión en dos semanas.', cta: 'Ver agentes a medida' },
    calc: { eyebrow: 'Calculadora de llamadas perdidas', h2: '¿Cuánto te cuestan las llamadas perdidas?', lede: 'Cuatro datos y la aritmética a la vista, porque un número que no puedes comprobar no vale nada. Elige tu industria y carga cifras típicas para empezar.', link: 'Abrir la calculadora completa' },
    proof: { eyebrow: 'Pruebas', h2: 'Con sus palabras, o nada.' },
    start: {
      eyebrow: 'Cómo empieza', h2: '¿Cuánto tarda en estar listo?',
      steps: [
        ['Llámanos o agenda 30 minutos', 'Keres AI empieza con una llamada de 30 minutos. Mapeamos lo que pasa hoy cuando suena tu teléfono: quién contesta, qué se pregunta y dónde se pierden los contactos. Sales con una cotización de Found (desde $249 al mes, $499 para bufetes) y de Remi (una tarifa mensual con minutos incluidos, luego por minuto). La línea de la oficina, (973) 495-2223, la contesta una persona.'],
        ['Construimos tu sitio, tu ficha y tu guion de admisión', 'Tus servicios, tus horarios, tus precios, tus reglas de transferencia. Luego entran tu número, tu calendario y tu CRM.'],
        ['Lo pruebas y entra en marcha', 'Primero lo llamas tú y lo ajustamos hasta que conteste como lo harías tú. Los plazos dependen de tus flujos de llamadas e integraciones, y los acordamos en la primera llamada. Desde ahí, mes a mes, y el resumen diario empieza a la mañana siguiente.'],
      ],
    },
    faq: {
      eyebrow: 'Preguntas', h2: 'Las preguntas que todos hacen primero.',
      items: [
        ['¿Cuánto cuesta Keres AI?', 'Found (el sitio web, la ficha de Google, las reseñas y los directorios) empieza en $249/mes, $499/mes para bufetes de abogados. Remi, el recepcionista con IA, {answerCost}: una tarifa mensual con minutos incluidos, luego por minuto, sin cargos por llamada. Todo es mes a mes, sin cargo por cancelar; para cancelar, avisa con 30 días de anticipación por escrito. <a href="/pricing">Ver qué cambia la cotización</a>.'],
        ['¿Tengo que comprar todo el equipo?', 'No. Puedes empezar por una puerta: Found si nadie te encuentra, Remi si la fuga es el teléfono. Agrega la siguiente etapa cuando la primera ya funcione, o contrata solo Found y sigue contestando tú mismo.'],
        ['¿Y si quien llama necesita a una persona?', 'Remi transfiere. Tú pones las reglas (una emergencia, un cliente con nombre, cualquiera que pida a una persona) y la llamada pasa en caliente a tu número de guardia. Si nadie contesta, recibes una alerta de "llámame ahora" con todo lo que Remi ya recopiló, para que quien llama nunca lo repita.'],
        ['¿Cuánto tarda la puesta en marcha?', 'Depende de tus flujos de llamadas y tus integraciones. El primer día es una llamada de 30 minutos para mapear cómo contestas hoy; luego escribimos tu guion de admisión y conectamos tu número, calendario y CRM. Acordamos los plazos en esa primera llamada, y tú pruebas a Remi antes de que conteste a un cliente.'],
        ['¿Hay contrato?', 'No hay contrato a largo plazo. Todos los planes son mes a mes, no hay costo de construcción en el nivel base de Found, y puedes cambiar de plan cualquier mes o cancelar con 30 días de aviso por escrito.'],
        ['¿Suena como un robot?', 'Suena como una recepción competente. Remi contesta en dos timbres, usa tu vocabulario (consulta, trabajo, tiempo de sillón, visita) y dice "déjame comunicarte con alguien" en lugar de adivinar cuando no sabe. <a href="/hear-it">Escucha llamadas de muestra</a>, o pide una llamada de prueba en vivo cuando hablemos.'],
      ],
      answerCostWith: 'empieza en {price}/mes', answerCostWithout: 'se cotiza según tu volumen de llamadas',
    },
    close: { h2: 'Llama al número y escucha a Remi contestar.', h2NoPhone: 'Escucha a Remi contestar antes de decidir.', lede: 'Es el mismo agente que atendería a tus clientes. Pregúntale algo incómodo: de eso se trata. Found desde {found}/mes', remi: '; Remi desde {price}/mes' },
  },
} as const;

export type Home = typeof home.en;
export const homeCopy = (locale: Locale): Home => (home[locale] as unknown) as Home;

const fill = (s: string, map: Record<string, string>) => s.replace(/\{(\w+)\}/g, (_, k) => map[k] ?? '');
/** FAQ items with the Answer price sentence resolved (or the no-price variant). */
export const faqsFor = (locale: Locale) => {
  const c = homeCopy(locale);
  const floor = priceFrom('answer');
  const cost = floor ? fill(c.faq.answerCostWith, { price: floor.replace('from ', '') }) : c.faq.answerCostWithout;
  return c.faq.items.map(([q, a]) => ({ q, a: fill(a, { answerCost: cost }) }));
};
