// /pricing and /es/pricing: one row per worker.
import type { Locale } from './index';

import { priceAmount } from '../config/business';
export const pricing = {
  en: {
    title: 'Pricing — One Price Per Worker, Quoted to You | Keres AI',
    description: 'Every Keres worker publishes what it starts at: Found, Remi, Theo, June, Sol, and a bundle. Custom is scoped on a call. Month-to-month, set up for you.',
    crumbs: ['Home', 'Pricing'],
    eyebrow: 'Pricing', h1: 'One price per worker. Quoted to your business.',
    lede: 'You should not have to book a call to find out whether you can afford this. Every worker below publishes what it starts at, and the list further down says exactly what moves the number. Then we scope it on a 30-minute call and you get one monthly rate with included minutes.',
    call: 'Call', quote: 'Get your quote', simultaneous: ['Billing', 'Included minutes, then per minute.'],
    terms: [['Contract', 'Month-to-month. Cancel with 30 days’ written notice.'], ['Setup', 'Done for you. Timing agreed on your first call.'], ['Usage', 'Per-minute after your included minutes.']],
    tableEyebrow: 'The roster', tableH2: 'How much does Keres AI cost?',
    tableLede: 'Each worker does one job and reports to the same morning text. Prices are starting points, quoted to your volume.',
    cols: ['Worker', 'Job', 'From', 'What hiring it includes', ''],
    from: 'from', perMo: '/mo', quoted: 'Quoted to your volume', scoped: 'Scoped on a call', build: 'build', run: 'run',
    hire: 'Hire {name}', scope: 'Scope a build', hireAll: 'Hire them all',
    bundle: { name: 'All of them', job: 'Every worker, one pipeline, one text', includes: ['Found, Remi, Theo, June and Sol together', 'One Daily Brief', 'One invoice'] },
    tableFoot: 'Prices shown are starting points, not caps or averages. Custom is a worker built by Keres AI for one recurring job no other worker covers. For example, a Custom worker might draft a weekly report or reply to new Google reviews. Custom is priced as a fixed build price plus a monthly run fee, and both numbers are agreed in writing before any work starts. First, the job is scoped on a 30-minute call. Next, Keres AI writes a one-page scope for your approval. Finally, the first version runs in draft mode, and nothing reaches a customer without your yes. Integration or migration work is quoted separately, in writing, before the work begins.',
    discount: 'Hire Found with any other worker and save {pct}%.', prefer: 'Prefer to talk it through?',
    factorsEyebrow: 'No surprises', factorsH2: 'What changes the quote?', factorsLede: 'Keres AI prices each quote on seven factors, and none of them is a secret. First, call volume matters most for Remi. Remi is billed as a monthly rate with included minutes, then per minute. Second, industry matters because intake calls run longer in some trades than in others. Third, integrations matter because Google Calendar, HubSpot, ServiceTitan and Zapier each take different setup. For example, a law firm with 2 offices on HubSpot gets a different quote than a one-truck HVAC company on Google Calendar. If you can answer the seven questions below on the phone, Keres AI can price you on the same 30-minute call.',
    factors: ['How many locations you run', 'Your industry and how long an intake call takes', 'Monthly call volume', 'Which integrations you need', 'AI search visibility and Local Services Ads add-ons', 'How many reviews a month you generate', 'How many workers you hire together'],
    proofEyebrow: 'Proof', proofH2: 'What it replaces', proofLede: 'The comparison that matters is not against other software. It is against a part-time front desk, an answering service billing you by the minute, and the jobs that went to whoever picked up first.',
    faqTitle: 'Pricing FAQ',
    faqs: [
      ['How much does Keres cost?', 'Each worker publishes a starting price on this page and is then quoted to your call volume, locations and integrations. Custom is the only one without a published number: it is scoped on a 30-minute call because no two jobs are alike.'],
      ['Is there a contract?', 'No long-term contract. Every Keres AI worker is month-to-month, with no minimum term and no cancellation fee. To cancel, give 30 days’ written notice, as the terms of service set out.'],
      ['Is there a setup fee?', 'Not for the workers on the table: design, hosting, care and onboarding are in the monthly fee. Custom has a fixed build price agreed before the work starts, and integration or migration work is quoted separately, in writing.'],
      ['How does usage billing work?', 'Each worker that talks includes a monthly pool of minutes sized to your volume. Past that pool you pay per minute at your quoted rate. There is no per-call charge. Your quote sizes the included minutes to your busy season, so ask on the call how Remi handles your peak volume.'],
      ['Can I add or drop a worker later?', 'Any month, in either direction. You can start with any one worker. For example, a business might start with Remi on the phones, add Theo to confirm appointments and chase open estimates, and bring in June to contact past customers and ask for reviews.'],
      ['How long does setup take?', 'It depends on your call flows and integrations. A 30-minute call to map how you answer now, then Keres writes your intake script and connects your number, calendar and CRM. We agree the timing on that first call, and you test Remi yourself before it answers a customer.'],
      ['What happens when a caller needs a human?', 'Remi warm-transfers to your on-call number under rules you set. If nobody picks up, you get a "call me now" alert carrying everything Remi already collected, so the caller never has to repeat themselves.'],
    ],
  },
  es: {
    title: 'Precios: un precio por trabajador | Keres AI',
    description: 'Cada trabajador de Keres publica desde cuánto empieza: Found, Remi, Theo, June, Sol y un paquete. Custom se define en una llamada. Mes a mes, lo configuramos por ti.',
    crumbs: ['Inicio', 'Precios'],
    eyebrow: 'Precios', h1: 'Un precio por trabajador. Cotizado a tu negocio.',
    lede: 'No deberías tener que agendar una llamada para saber si puedes pagarlo. Cada trabajador de abajo publica desde cuánto empieza, y la lista de más abajo dice exactamente qué mueve el número. Luego lo definimos en una llamada de 30 minutos y recibes una sola tarifa mensual fija.',
    call: 'Llamar al', quote: 'Pedir cotización', simultaneous: ['Cobro', 'Minutos incluidos, luego por minuto.'],
    terms: [['Contrato', 'Mes a mes. Cancela con 30 días de aviso por escrito.'], ['Implementación', 'La hacemos por ti. Plazo acordado en tu primera llamada.'], ['Uso', 'Por minuto después de los minutos incluidos.']],
    tableEyebrow: 'El equipo', tableH2: '¿Cuánto cuesta Keres AI?',
    tableLede: 'Cada trabajador hace una sola tarea y reporta al mismo mensaje de la mañana. Los precios son puntos de partida, cotizados a tu volumen.',
    cols: ['Trabajador', 'Tarea', 'Desde', 'Qué incluye contratarlo', ''],
    from: 'desde', perMo: '/mes', quoted: 'Cotizado a tu volumen', scoped: 'Se define en una llamada', build: 'desarrollo', run: 'operación',
    hire: 'Contratar {a}{name}', scope: 'Cotizar mi agente', hireAll: 'Contratarlos a todos',
    bundle: { name: 'Todos', job: 'Todos los trabajadores, un pipeline, un mensaje', includes: ['Found, Remi, Theo, June y Sol juntos', 'Un solo Resumen diario', 'Una sola factura'] },
    tableFoot: 'Los precios son puntos de partida, no topes ni promedios. Custom es el único trabajador sin número publicado: una tarea recurrente se define y cotiza en una llamada de 30 minutos.',
    discount: 'Contrata Found con cualquier otro trabajador y ahorra {pct}%.', prefer: '¿Prefieres hablarlo?',
    factorsEyebrow: 'Sin sorpresas', factorsH2: '¿Qué cambia la cotización?', factorsLede: 'Siete cosas, y ninguna es un secreto. Si puedes responderlas por teléfono, podemos cotizarte en la misma llamada.',
    factors: ['Cuántas ubicaciones tienes', 'Tu industria y cuánto dura una llamada de admisión', 'Volumen mensual de llamadas', 'Qué integraciones necesitas', 'Adicionales de visibilidad en búsqueda con IA y Local Services Ads', 'Cuántas reseñas generas al mes', 'Cuántos trabajadores contratas juntos'],
    proofEyebrow: 'Prueba', proofH2: 'Qué reemplaza', proofLede: 'La comparación que importa no es contra otro software. Es contra una recepción de medio tiempo, un servicio de contestación que cobra por minuto y los trabajos que se fueron con quien contestó primero.',
    faqTitle: 'Preguntas sobre precios',
    faqs: [
      ['¿Cuánto cuesta Keres?', 'Cada trabajador publica un precio inicial en esta página y luego se cotiza según tu volumen de llamadas, ubicaciones e integraciones. Custom es el único sin número publicado: se define en una llamada de 30 minutos porque no hay dos tareas iguales.'],
      ['¿Hay contrato?', 'No hay contrato a largo plazo. Todos los trabajadores de Keres AI son mes a mes, sin plazo mínimo ni cargo por cancelación. Para cancelar, avisa con 30 días de anticipación por escrito, como indican los términos del servicio.'],
      ['¿Hay cargo de instalación?', 'No para los trabajadores de la tabla: diseño, hosting, mantenimiento e implementación van en la cuota mensual. Custom tiene un precio fijo de desarrollo acordado antes de empezar, y el trabajo de integración o migración se cotiza aparte, por escrito.'],
      ['¿Cómo funciona el cobro por uso?', 'Cada trabajador que habla incluye una bolsa mensual de minutos ajustada a tu volumen. Pasada esa bolsa pagas por minuto a tu tarifa cotizada. No hay cargo por llamada. Tu cotización ajusta los minutos incluidos a tu temporada alta, así que pregunta en la llamada cómo maneja Remi tu volumen pico.'],
      ['¿Puedo agregar o quitar un trabajador después?', 'Cualquier mes, en cualquier dirección. Puedes empezar con cualquier trabajador. Por ejemplo, un negocio puede empezar con Remi en el teléfono, sumar a Theo para confirmar citas y dar seguimiento a cotizaciones abiertas, y traer a June para contactar a clientes anteriores y pedir reseñas.'],
      ['¿Cuánto tarda la implementación?', 'Depende de tus flujos de llamadas y tus integraciones. Una llamada de 30 minutos para mapear cómo contestas hoy, luego escribimos tu guion de admisión y conectamos tu número, calendario y CRM. Acordamos los plazos en esa primera llamada, y tú pruebas a Remi antes de que conteste a un cliente.'],
      ['¿Qué pasa cuando quien llama necesita a una persona?', 'Remi transfiere en caliente a tu número de guardia bajo las reglas que tú fijas. Si nadie contesta, recibes una alerta de "llámame ahora" con todo lo que Remi ya recogió, para que quien llama nunca tenga que repetirse.'],
    ],
  },
} as const;
export type Pricing = typeof pricing.en;
// Until every talking worker has a published price, the page must not claim
// that each one "publishes what it starts at": Found shows its number, the
// rest say they are quoted.
const allPriced = (['remi', 'theo', 'june', 'sol'] as const).every((k) => priceAmount(k));
const quotedCopy = {
  en: {
    description: 'Found starts at $249/month ($499 for law firms). Remi, Theo, June and Sol are quoted to your volume: included minutes, no per-call fees, month-to-month.',
    lede: 'Keres AI publishes one price. Found is the website and Google Business Profile service, and Found starts at $249 a month ($499 for law firms), with no build fee at the base tier. Remi, Theo, June and Sol are quoted on a 30-minute call, because the right number depends on call volume, locations, industry and integrations. The list further down shows exactly what moves the number. Remi is billed as one monthly rate with included minutes, then per minute, and there are no per-call fees. For example, a plumber with a quiet winter and a busy summer gets included minutes sized to the busy season. Every plan is month-to-month, and you can cancel with 30 days’ written notice. Finally, the office line, (973) 495-2223, is answered by a person, so you can ask about price before booking anything.',
    tableLede: 'Keres AI pricing is one published starting price plus quotes. Found by Keres AI, the website and Google Business Profile service, starts at $249 a month, and law firms pay from $499. Remi by Keres AI is the AI receptionist. Remi is billed as one monthly rate with included minutes, then per minute, with no per-call fees, and is quoted to your call volume. Theo (confirmations and reminders), June (reactivation and review requests) and Sol (outbound email) are also quoted to your volume. Custom has a fixed build price plus a monthly run fee. Every worker is month-to-month: cancel with 30 days’ written notice. For example, a business that hires Found alone pays from $249 a month and keeps answering its own phone. A business that adds Remi later gets one quote covering both workers. Each price below is a starting point, and each worker reports to the same morning text.',
    faq0: 'Found starts at $249 a month ($499 for law firms). Remi, Theo, June and Sol are quoted to your call volume, locations and integrations on a 30-minute call: one monthly rate with included minutes, per-minute after that, and no per-call fees. Custom is scoped on the same call.',
  },
  es: {
    description: 'Precios de Keres AI: Found desde $249/mes ($499 para bufetes). Remi, Theo, June y Sol se cotizan según tu volumen, con minutos incluidos y mes a mes.',
    lede: 'Keres AI publica un precio, Found desde $249 al mes ($499 para bufetes), y cotiza los demás trabajadores en una llamada de 30 minutos. La cotización depende del volumen de llamadas, las ubicaciones, la industria y las integraciones, y la lista de más abajo dice exactamente qué mueve el número. Mes a mes, sin cargos por llamada.',
    tableLede: 'Found by Keres AI, el servicio de sitio web y perfil de Google Business, empieza en $249 al mes ($499 para bufetes). Remi by Keres AI, el recepcionista con IA, se cobra como una tarifa mensual con minutos incluidos y luego por minuto, sin cargos por llamada, y se cotiza según tu volumen de llamadas. Theo, June y Sol se cotizan según tu volumen, y Custom tiene un precio fijo de desarrollo más una cuota mensual de operación. Todos son mes a mes: cancela con 30 días de aviso por escrito.',
    faq0: 'Found empieza en $249 al mes ($499 para bufetes). Remi, Theo, June y Sol se cotizan según tu volumen, ubicaciones e integraciones en una llamada de 30 minutos: una tarifa mensual con minutos incluidos, por minuto después, y sin cargos por llamada. Custom se define en la misma llamada.',
  },
};
export const pricingCopy = (locale: Locale): Pricing => {
  const base = (pricing[locale] as unknown) as Pricing;
  if (allPriced) return base;
  const q = quotedCopy[locale];
  return { ...base, description: q.description, lede: q.lede, tableLede: q.tableLede, faqs: base.faqs.map((f, i) => (i === 0 ? [f[0], q.faq0] : f)) as typeof base.faqs };
};
export const pricingFaqs = (locale: Locale) => pricingCopy(locale).faqs.map(([q, a]) => ({ q, a }));
