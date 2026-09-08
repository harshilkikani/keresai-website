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
  },
  es: {
    title: 'Agentes de IA a medida para una tarea recurrente | Keres AI',
    description: 'Construimos agentes de IA que hacen una sola tarea recurrente en tu negocio y te reportan cada mañana por mensaje de texto. Precio fijo de desarrollo, cuota mensual, primera versión en dos semanas.',
    eyebrow: 'Agentes a medida',
    h1: 'Un trabajador para la tarea que nadie en tu equipo tiene tiempo de hacer.',
    lede: 'Construimos agentes de IA que hacen una sola tarea recurrente en tu negocio, te reportan cada mañana por mensaje de texto y cuestan menos que la hora a la semana que pasarías haciéndola mal. Nosotros usamos tres en nuestra propia empresa.',
    scope: 'Cotizar mi agente', call: 'Llamar al',
  },
} as const;

export type Custom = typeof custom.en;
export const customCopy = (locale: Locale): Custom => (custom[locale] as unknown) as Custom;
