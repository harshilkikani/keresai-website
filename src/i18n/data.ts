// Locale-aware accessors over the data files. English is the data file
// itself; Spanish comes from ./data.es. Shapes are identical.
import type { Locale } from './index';
import { stages as stagesEn } from '../data/leaks';
import { agents as agentsEn, foundServices as foundEn } from '../data/site';
import { transcripts as trEn, briefs as brEn, agentMocks as amEn, siteMock as smEn, listingMock as lmEn, heroTail as htEn } from '../data/mocks';
import { goPages as goEn, goSteps as goStepsEn } from '../data/go';
import { goWebsitePages as gwEn } from '../data/goWebsite';
import { workers as workersEn } from '../data/workers';
import * as es from './data.es';

const pick = <T,>(locale: Locale, en: T, esV: T): T => (locale === 'es' ? esV : en);

export const stagesFor = (l: Locale) => pick(l, stagesEn, es.stages);
export const agentsFor = (l: Locale) => pick(l, agentsEn, es.agents);
export const foundServicesFor = (l: Locale) => pick(l, foundEn, es.foundServices);
export const transcriptsFor = (l: Locale) => pick(l, trEn, es.transcripts);
export const briefsFor = (l: Locale) => pick(l, brEn, es.briefs);
export const agentMocksFor = (l: Locale) => pick(l, amEn, es.agentMocks);
export const siteMockFor = (l: Locale) => pick(l, smEn, es.siteMock);
export const siteMockTextFor = (l: Locale) => pick(l, { eyebrow: 'HVAC · Licensed & insured', sub: 'Furnace out? AC dead? A real person books you in two rings, day or night.' }, es.siteMockText);
export const listingMockFor = (l: Locale) => pick(l, lmEn, es.listingMock);
export const heroTailFor = (l: Locale) => pick(l, htEn, es.heroTail);
export const goPagesFor = (l: Locale) => pick(l, goEn, es.goPages);
export const goStepsFor = (l: Locale) => pick(l, goStepsEn, es.goSteps);
export const goWebsitePagesFor = (l: Locale) => pick(l, gwEn, es.goWebsitePages);
/** Slug of the English Found service name, used for /services/found#anchors in every language. */
export const foundAnchor = (i: number) => foundEn[i].name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
export const workersFor = (l: Locale) => pick(l, workersEn, es.workers);
