import { LanguageCode, TranslationSchema } from './types.js';
import { en } from './en.js';
import { hi } from './hi.js';
import { as } from './locales/as.js';
import { bn } from './locales/bn.js';
import { brx } from './locales/brx.js';
import { doi } from './locales/doi.js';
import { gu } from './locales/gu.js';
import { kn } from './locales/kn.js';
import { ks } from './locales/ks.js';
import { kok } from './locales/kok.js';
import { mai } from './locales/mai.js';
import { ml } from './locales/ml.js';
import { mni } from './locales/mni.js';
import { mr } from './locales/mr.js';
import { ne } from './locales/ne.js';
import { or } from './locales/or.js';
import { pa } from './locales/pa.js';
import { sa } from './locales/sa.js';
import { sat } from './locales/sat.js';
import { sd } from './locales/sd.js';
import { ta } from './locales/ta.js';
import { te } from './locales/te.js';
import { ur } from './locales/ur.js';

export * from './types.js';
export * from './languages.js';
export { en } from './en.js';
export { hi } from './hi.js';
export { as, bn, brx, doi, gu, kn, ks, kok, mai, ml, mni, mr, ne, or, pa, sa, sat, sd, ta, te, ur };

export const translations: Record<LanguageCode, TranslationSchema> = {
  en,
  as,
  bn,
  brx,
  doi,
  gu,
  hi,
  kn,
  ks,
  kok,
  mai,
  ml,
  mni,
  mr,
  ne,
  or,
  pa,
  sa,
  sat,
  sd,
  ta,
  te,
  ur,
};

export function getTranslation(key: keyof TranslationSchema, lang: LanguageCode = 'en'): string {
  const selectedLocale = translations[lang] || translations.en;
  return selectedLocale[key] || translations.en[key] || String(key);
}
