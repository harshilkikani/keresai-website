// /custom and /es/custom. English is the source of truth for shape; Spanish
// was written in-house and is listed in es.review.md for native review.
import type { Locale } from './index';

export const custom = {
  en: {
    title: 'Custom AI Agents for One Recurring Job | Keres AI',
    description: 'We build AI agents that do one recurring job in your business and report to you in a text every morning. Fixed build price, monthly run fee, first version in two weeks.',
    eyebrow: 'Custom agents',
    h1: 'A worker for the job nobody on your team has time for.',
    lede: 'We build AI agents that do one recurring job in your business, report to you in a text every morning, and cost less than the hour a week you’d spend doing it badly. We run three of them on our own company.',
    scope: 'Scope a build', call: 'Call',
    cases: {
      eyebrow: 'Three we run on ourselves', h2: 'Not demos. Our own agents, doing their job today.',
      lede: 'Each one started as the one-page scope you’ll get. The numbers inside the mocks show the shape of the work, not results.',
      label: 'Runs on Keres today', example: 'Example',
      items: [
        { title: 'Google listing agent', job: 'Audits the Business Profile, writes the weekly posts, replies to every review, keeps a 25-point rank grid around the office and drafts outreach to the prospects it finds nearby.' },
        { title: 'Sol, outbound', job: 'Checks SPF, DKIM and DMARC before a single send, warms the domain for weeks, then runs the sequence and books the reply into the calendar.' },
        { title: 'Owner Daily Brief', job: 'Reads the day’s calls, bookings, reviews and ad spend and sends one text at 7 am: what happened, and the one thing that needs a person.' },
      ],
      listing: { head: 'Listing agent · this week', gridNote: 'Rank for “hvac repair” at 25 points around the office', log: [['Audit', 'Hours, categories and photos checked'], ['Posts', '2 drafted for the week'], ['Replies', '3 reviews answered, awaiting your OK'], ['Outreach', '4 nearby prospects drafted']] },
      outbound: { head: 'Sol · before the first send', checks: [['SPF', 'pass'], ['DKIM', 'pass'], ['DMARC', 'p=quarantine']], warm: 'Warm-up', warmNote: 'Day 12 of 28 · 34 sends a day', paused: 'The sequence starts when warm-up completes.' },
    },
    how: {
      eyebrow: 'How it works', h2: 'Six steps, and you approve everything it publishes.',
      steps: [
        ['A 20-minute call', 'You describe the job as you would to a new hire: what comes in, what should go out, what “done” looks like.'],
        ['A one-page scope', 'Within two business days: the inputs, the outputs, the rules, what it may never do, and what it reports to you.'],
        ['A fixed build price', 'One number for the build, agreed before we start. It does not move once the scope is signed.'],
        ['A monthly run fee', 'Covers the running, the model costs, the monitoring, and the changes the job needs as your business changes.'],
        ['First version in two weeks', 'It runs in draft mode first: it prepares everything and you see it in the morning text before anything goes out.'],
        ['You approve what it publishes', 'Nothing reaches a customer, a listing or an inbox without your yes. Once you trust it, you approve by exception.'],
      ],
    },
    pricing: {
      eyebrow: 'What it costs', h2: 'One number to build it. One to run it.',
      build: { title: 'Build', kind: 'one time', desc: 'Fixed, agreed on the scope before we start. It does not move once the scope is signed.' },
      run: { title: 'Run', kind: 'per month, month-to-month', desc: 'Covers the running, the model costs, the monitoring and the morning text.' },
      from: 'from', quoted: 'Quoted on the scope call.',
      note: 'If the scope changes later, the price changes with it, in writing, before the work.',
    },
  },
  es: {
    title: 'Agentes de IA a medida para una tarea recurrente | Keres AI',
    description: 'Construimos agentes de IA que hacen una sola tarea recurrente en tu negocio y te reportan cada mañana por mensaje de texto. Precio fijo de desarrollo, cuota mensual, primera versión en dos semanas.',
    eyebrow: 'Agentes a medida',
    h1: 'Un trabajador para la tarea que nadie en tu equipo tiene tiempo de hacer.',
    lede: 'Construimos agentes de IA que hacen una sola tarea recurrente en tu negocio, te reportan cada mañana por mensaje de texto y cuestan menos que la hora a la semana que pasarías haciéndola mal. Nosotros usamos tres en nuestra propia empresa.',
    scope: 'Cotizar mi agente', call: 'Llamar al',
    cases: {
      eyebrow: 'Tres que usamos nosotros', h2: 'No son demos. Nuestros propios agentes, trabajando hoy.',
      lede: 'Cada uno empezó como el documento de una página que tú también vas a recibir. Los números dentro de los ejemplos muestran la forma del trabajo, no resultados.',
      label: 'Funciona en Keres hoy', example: 'Ejemplo',
      items: [
        { title: 'Agente de ficha de Google', job: 'Audita el Perfil de Negocio, escribe las publicaciones semanales, responde cada reseña, mantiene una cuadrícula de ranking de 25 puntos alrededor de la oficina y redacta mensajes para los prospectos que encuentra cerca.' },
        { title: 'Sol, salida', job: 'Verifica SPF, DKIM y DMARC antes de un solo envío, calienta el dominio durante semanas y luego corre la secuencia y agenda la respuesta en el calendario.' },
        { title: 'Resumen diario del dueño', job: 'Lee las llamadas, citas, reseñas y gasto en anuncios del día y envía un solo mensaje a las 7 am: qué pasó y lo único que necesita a una persona.' },
      ],
      listing: { head: 'Agente de ficha · esta semana', gridNote: 'Ranking para “reparación de aire acondicionado” en 25 puntos alrededor de la oficina', log: [['Auditoría', 'Horario, categorías y fotos revisados'], ['Publicaciones', '2 redactadas para la semana'], ['Respuestas', '3 reseñas contestadas, esperan tu OK'], ['Prospección', '4 prospectos cercanos redactados']] },
      outbound: { head: 'Sol · antes del primer envío', checks: [['SPF', 'pasa'], ['DKIM', 'pasa'], ['DMARC', 'p=quarantine']], warm: 'Calentamiento', warmNote: 'Día 12 de 28 · 34 envíos al día', paused: 'La secuencia empieza cuando termina el calentamiento.' },
    },
    how: {
      eyebrow: 'Cómo funciona', h2: 'Seis pasos, y tú apruebas todo lo que publica.',
      steps: [
        ['Una llamada de 20 minutos', 'Describes la tarea como se la explicarías a alguien nuevo: qué entra, qué debe salir y cómo se ve “terminado”.'],
        ['Un documento de una página', 'En dos días hábiles: las entradas, las salidas, las reglas, lo que nunca puede hacer y qué te reporta.'],
        ['Un precio fijo de desarrollo', 'Un solo número por el desarrollo, acordado antes de empezar. No cambia una vez firmado el alcance.'],
        ['Una cuota mensual', 'Cubre la operación, el costo de los modelos, el monitoreo y los cambios que la tarea necesita cuando tu negocio cambia.'],
        ['Primera versión en dos semanas', 'Primero corre en modo borrador: prepara todo y lo ves en el mensaje de la mañana antes de que salga algo.'],
        ['Tú apruebas lo que publica', 'Nada llega a un cliente, una ficha o una bandeja de entrada sin tu sí. Cuando ya confías, apruebas por excepción.'],
      ],
    },
    pricing: {
      eyebrow: 'Cuánto cuesta', h2: 'Un número para construirlo. Otro para operarlo.',
      build: { title: 'Desarrollo', kind: 'pago único', desc: 'Fijo, acordado sobre el alcance antes de empezar. No cambia una vez firmado el alcance.' },
      run: { title: 'Operación', kind: 'al mes, mes a mes', desc: 'Cubre la operación, el costo de los modelos, el monitoreo y el mensaje de la mañana.' },
      from: 'desde', quoted: 'Se cotiza en la llamada de alcance.',
      note: 'Si el alcance cambia después, el precio cambia con él, por escrito y antes del trabajo.',
    },
  },
} as const;

export type Custom = typeof custom.en;
export const customCopy = (locale: Locale): Custom => (custom[locale] as unknown) as Custom;
