// Homepage copy in both languages. Prices and names come from the data
// files; only prose lives here.
import type { Locale } from './index';
import { priceFrom } from '../config/business';

export const home = {
  en: {
    title: 'Get Found, Get Answered, Get Booked | Keres AI',
    description: 'A conversion website and a managed Google listing so you show up, and Remi answering every call in two rings so the call gets booked. Live in five days, from $249/month.',
    eyebrow: 'AI workers for local businesses',
    h1: [['Get', 'found.'], ['Get', 'answered.'], ['Get', 'booked.']],
    lede: 'Hire one, hire all. Each does one job, reports to you in a text every morning{bundle}. Live in five days, month-to-month.',
    facts: [['Answers in', '2', ' rings'], ['Live in', '5', ' days']], factBundle: ['Bundles from', '/mo'],
    ledeBundle: ', and starts from {price}/mo', hearRemi: '— hear Remi answer',
    atAGlance: 'At a glance', getAQuote: 'Get a quote', call: 'Call',
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
    team: { eyebrow: 'Be Answered — the team', h2: 'Three agents. One phone number.', lede: 'One system that answers the call, remembers it, and keeps working it after everyone has gone home. On your line they introduce themselves with whatever name you choose.', what: 'What {name} does' },
    found: { eyebrow: 'One worker, eight jobs', h2: 'What Found does.', lede: 'Everything that has to be true before your phone rings. Eight jobs, one worker, one monthly fee{price}.', priceClause: ', {from} a month', from: 'from $', per: '/month · quoted to your volume', cta: 'What Found does', addOn: 'Add-on' },
    brief: { eyebrow: 'Owner Daily Brief', h2: 'You don’t log into a dashboard. You get a text.', lede: 'Every worker reports to the same text.', body: 'Green is money that stayed. Amber is the one item waiting on you. If nothing is waiting on you, there is no amber line.' },
    industries: {
      eyebrow: 'Who it is for', h2: 'It uses your words, not “customer.”', lede: 'A conflict check is not an intake form and chair time is not an appointment. Remi is trained on the vocabulary and the questions your vertical actually asks.',
      items: [
        ['/industries/law-firms', 'Law firms', 'A new-client call at 2 a.m., screened for conflicts, the matter qualified, the consult on the calendar before you open.'],
        ['/industries/home-services', 'Home services', 'Emergency jobs triaged, a dispatch window given on the call, estimates chased until they close.'],
        ['/industries/dental-med-spa', 'Dental & med spa', 'Chair time filled from the cancellation list, recall rebooked, no-shows headed off the night before.'],
        ['/industries/real-estate', 'Real estate', 'Listing calls answered on a Saturday, buyers qualified, showings booked without you in the car.'],
      ],
      foot: 'Nine more specific pages — HVAC, plumbing, roofing, septic, towing, dentists, med spas, real estate and professional intake — sit under', footLink: 'all industries',
    },
    integrations: { eyebrow: 'Integrations', h2: 'It books into the calendar you already use.', lede: 'A booking that lives only inside our software is not a booking. Remi writes to the tools your team already opens every morning.', aria: 'Connected today', foot: 'Connected today. Clio and Lawmatics, Jobber and Housecall Pro, Dentrix and Open Dental, and Follow Up Boss are rolling out — ask where yours is. Anything else speaks webhooks and CSV out of the box.', footLink: 'See all integrations' },
    customTeaser: { eyebrow: 'Custom agents', h2: 'Need a job done that isn’t on this page?', text: 'We build one-job agents for the recurring work nobody on your team has time for, and we run three on our own company. Fixed build price, monthly run fee, first version in two weeks.', cta: 'See custom agents' },
    calc: { eyebrow: 'Missed-call calculator', h2: 'Put your own numbers in.', lede: 'Four inputs and the arithmetic shown in full, because a number you cannot check is not worth having. Pick your industry and it loads typical figures to start from.', link: 'Open the full calculator' },
    proof: { eyebrow: 'Proof', h2: 'In their words, or not at all.' },
    start: {
      eyebrow: 'How it starts', h2: 'Three steps, five business days.',
      steps: [
        ['Call us, or book 20 minutes', 'We map what happens today when your phone rings — who it goes to, what gets asked, and where it stops. Twenty minutes, no deck.'],
        ['We build your site, your listing and your intake script', 'Your services, your hours, your prices, your handoff rules. Then your number, calendar and CRM go in.'],
        ['Live in five business days', 'You call it yourself first and keep tuning until it answers the way you would. Month-to-month from there, and the Daily Brief starts the next morning.'],
      ],
    },
    faq: {
      eyebrow: 'Questions', h2: 'The questions everyone asks first.',
      items: [
        ['How much does it cost?', 'Found — the website, Google listing, reviews and listings layer — starts at $249/month, $499/month for law firms. Remi on the Answer plan {answerCost}. Every floor is quoted up to your call volume, locations and integrations, and there is no per-call billing. <a href="/pricing">See what changes the quote</a>.'],
        ['Do I have to buy the whole team?', 'No. Most firms start at one door — Found if nobody can find them, Remi if the phone is the leak — and add the next stage once that one is working. You can also buy Found on its own and keep answering calls yourself.'],
        ['What if a caller needs a human?', 'Remi hands off. You set the rules — an emergency, a named client, anyone who asks for a person — and the call warm-transfers to your on-call number. If nobody picks up, you get a "call me now" alert with everything Remi already collected, so the caller never repeats themselves.'],
        ['How long does setup take?', 'Five business days for most accounts. Day one is a 20-minute call to map how you answer now; then we write your intake script, connect your number, calendar and CRM, and you test it yourself before it takes a real call.'],
        ['Is there a contract?', 'No. Every plan is month-to-month, there is no build fee on the Found base tier, and you can change plans or cancel any month.'],
        ['Does it sound like a robot?', 'It sounds like a competent front desk. Remi answers in two rings, uses your vocabulary — consult, job, chair time, showing — and says "let me get someone for you" rather than guessing when it does not know. <a href="/hear-it">Hear sample calls</a>, or just call the number at the top of this page.'],
      ],
      answerCostWith: 'starts at {price}/month', answerCostWithout: 'is quoted to your call volume',
    },
    close: { h2: 'Call the number and listen to Remi answer.', lede: 'It is the same agent your callers would get. Ask it something awkward — that is the point of the exercise. Found from {found}/month', remi: '; Remi from {price}/month' },
  },
  es: {
    title: 'Que te encuentren, te contesten y te reserven | Keres AI',
    description: 'Un sitio web hecho para convertir y una ficha de Google administrada para que aparezcas, y Remi contestando cada llamada en dos timbres para que se agende. En cinco días, desde $249/mes.',
    eyebrow: 'Trabajadores de IA para negocios locales',
    h1: [['Que', 'te', 'encuentren.'], ['Que', 'te', 'contesten.'], ['Que', 'te', 'reserven.']],
    lede: 'Contrata uno o contrátalos todos. Cada uno hace una sola tarea, te reporta cada mañana por mensaje de texto{bundle}. En marcha en cinco días, mes a mes.',
    facts: [['Contesta en', '2', ' timbres'], ['En marcha en', '5', ' días']], factBundle: ['Paquetes desde', '/mes'],
    ledeBundle: ', y empieza desde {price}/mes', hearRemi: '— escucha a Remi contestar',
    atAGlance: 'De un vistazo', getAQuote: 'Pedir cotización', call: 'Llamar',
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
    team: { eyebrow: 'Que te contesten: el equipo', h2: 'Tres agentes. Un solo número.', lede: 'Un solo sistema que contesta la llamada, la recuerda y la sigue trabajando cuando ya todos se fueron a casa. En tu línea se presentan con el nombre que tú elijas.', what: 'Qué hace {name}' },
    found: { eyebrow: 'Un trabajador, ocho tareas', h2: 'Qué hace Found.', lede: 'Todo lo que tiene que estar en orden antes de que suene tu teléfono. Ocho tareas, un trabajador, una sola cuota mensual{price}.', priceClause: ', {from} al mes', from: 'desde $', per: '/mes · cotizado a tu volumen', cta: 'Qué hace Found', addOn: 'Adicional' },
    brief: { eyebrow: 'Resumen diario del dueño', h2: 'No entras a un panel. Recibes un mensaje.', lede: 'Todos los trabajadores reportan al mismo mensaje.', body: 'Verde es dinero que se quedó. Ámbar es lo único que te espera. Si nada te espera, no hay línea ámbar.' },
    industries: {
      eyebrow: 'Para quién es', h2: 'Usa tus palabras, no “cliente”.', lede: 'Una verificación de conflictos no es un formulario de admisión y el tiempo de sillón no es una cita. Remi está entrenado con el vocabulario y las preguntas que tu sector realmente hace.',
      items: [
        ['/industries/law-firms', 'Bufetes de abogados', 'Una llamada de cliente nuevo a las 2 a.m., revisada por conflictos, el asunto calificado, la consulta en el calendario antes de que abras.'],
        ['/industries/home-services', 'Servicios para el hogar', 'Emergencias clasificadas, ventana de despacho dada en la llamada, presupuestos perseguidos hasta que cierran.'],
        ['/industries/dental-med-spa', 'Dental y med spa', 'Tiempo de sillón llenado desde la lista de cancelaciones, recall reagendado, ausencias evitadas la noche anterior.'],
        ['/industries/real-estate', 'Bienes raíces', 'Llamadas por propiedades contestadas un sábado, compradores calificados, visitas agendadas sin que estés en el carro.'],
      ],
      foot: 'Nueve páginas más específicas (HVAC, plomería, techos, sépticos, grúas, dentistas, med spas, bienes raíces y admisión profesional) están bajo', footLink: 'todas las industrias',
    },
    integrations: { eyebrow: 'Integraciones', h2: 'Agenda en el calendario que ya usas.', lede: 'Una cita que solo vive dentro de nuestro software no es una cita. Remi escribe en las herramientas que tu equipo ya abre cada mañana.', aria: 'Conectadas hoy', foot: 'Conectadas hoy. Clio y Lawmatics, Jobber y Housecall Pro, Dentrix y Open Dental, y Follow Up Boss están en camino: pregunta por la tuya. Todo lo demás habla webhooks y CSV de fábrica.', footLink: 'Ver todas las integraciones' },
    customTeaser: { eyebrow: 'Agentes a medida', h2: '¿Necesitas una tarea que no está en esta página?', text: 'Construimos agentes de una sola tarea para el trabajo recurrente que nadie en tu equipo tiene tiempo de hacer, y usamos tres en nuestra propia empresa. Precio fijo de desarrollo, cuota mensual, primera versión en dos semanas.', cta: 'Ver agentes a medida' },
    calc: { eyebrow: 'Calculadora de llamadas perdidas', h2: 'Pon tus propios números.', lede: 'Cuatro datos y la aritmética a la vista, porque un número que no puedes comprobar no vale nada. Elige tu industria y carga cifras típicas para empezar.', link: 'Abrir la calculadora completa' },
    proof: { eyebrow: 'Pruebas', h2: 'Con sus palabras, o nada.' },
    start: {
      eyebrow: 'Cómo empieza', h2: 'Tres pasos, cinco días hábiles.',
      steps: [
        ['Llámanos o agenda 20 minutos', 'Mapeamos lo que pasa hoy cuando suena tu teléfono: a quién le llega, qué se pregunta y dónde se detiene. Veinte minutos, sin presentación.'],
        ['Construimos tu sitio, tu ficha y tu guion de admisión', 'Tus servicios, tus horarios, tus precios, tus reglas de transferencia. Luego entran tu número, tu calendario y tu CRM.'],
        ['En marcha en cinco días hábiles', 'Primero lo llamas tú y lo ajustamos hasta que conteste como lo harías tú. Desde ahí, mes a mes, y el resumen diario empieza a la mañana siguiente.'],
      ],
    },
    faq: {
      eyebrow: 'Preguntas', h2: 'Las preguntas que todos hacen primero.',
      items: [
        ['¿Cuánto cuesta?', 'Found (el sitio web, la ficha de Google, las reseñas y los directorios) empieza en $249/mes, $499/mes para bufetes de abogados. Remi en el plan Answer {answerCost}. Cada precio base se cotiza según tu volumen de llamadas, ubicaciones e integraciones, y no se cobra por llamada. <a href="/pricing">Ver qué cambia la cotización</a>.'],
        ['¿Tengo que comprar todo el equipo?', 'No. La mayoría empieza por una puerta (Found si nadie los encuentra, Remi si la fuga es el teléfono) y agrega la siguiente etapa cuando la primera ya funciona. También puedes contratar solo Found y seguir contestando tú mismo.'],
        ['¿Y si quien llama necesita a una persona?', 'Remi transfiere. Tú pones las reglas (una emergencia, un cliente con nombre, cualquiera que pida a una persona) y la llamada pasa en caliente a tu número de guardia. Si nadie contesta, recibes una alerta de "llámame ahora" con todo lo que Remi ya recopiló, para que quien llama nunca lo repita.'],
        ['¿Cuánto tarda la puesta en marcha?', 'Cinco días hábiles para la mayoría de las cuentas. El primer día es una llamada de 20 minutos para mapear cómo contestas hoy; luego escribimos tu guion de admisión, conectamos tu número, calendario y CRM, y lo pruebas tú mismo antes de que tome una llamada real.'],
        ['¿Hay contrato?', 'No. Todos los planes son mes a mes, no hay costo de construcción en el nivel base de Found, y puedes cambiar de plan o cancelar cualquier mes.'],
        ['¿Suena como un robot?', 'Suena como una recepción competente. Remi contesta en dos timbres, usa tu vocabulario (consulta, trabajo, tiempo de sillón, visita) y dice "déjame comunicarte con alguien" en lugar de adivinar cuando no sabe. <a href="/hear-it">Escucha llamadas de muestra</a>, o simplemente llama al número de arriba.'],
      ],
      answerCostWith: 'empieza en {price}/mes', answerCostWithout: 'se cotiza según tu volumen de llamadas',
    },
    close: { h2: 'Llama al número y escucha a Remi contestar.', lede: 'Es el mismo agente que atendería a tus clientes. Pregúntale algo incómodo: de eso se trata. Found desde {found}/mes', remi: '; Remi desde {price}/mes' },
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
