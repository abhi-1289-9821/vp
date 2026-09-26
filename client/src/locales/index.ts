import { LanguageCode, TranslationSchema } from './types.js';
import { en } from './en.js';
import { hi } from './hi.js';
import { as as rawAs } from './locales/as.js';
import { bn as rawBn } from './locales/bn.js';
import { brx as rawBrx } from './locales/brx.js';
import { doi as rawDoi } from './locales/doi.js';
import { gu as rawGu } from './locales/gu.js';
import { kn as rawKn } from './locales/kn.js';
import { ks as rawKs } from './locales/ks.js';
import { kok as rawKok } from './locales/kok.js';
import { mai as rawMai } from './locales/mai.js';
import { ml as rawMl } from './locales/ml.js';
import { mni as rawMni } from './locales/mni.js';
import { mr as rawMr } from './locales/mr.js';
import { ne as rawNe } from './locales/ne.js';
import { or as rawOr } from './locales/or.js';
import { pa as rawPa } from './locales/pa.js';
import { sa as rawSa } from './locales/sa.js';
import { sat as rawSat } from './locales/sat.js';
import { sd as rawSd } from './locales/sd.js';
import { ta as rawTa } from './locales/ta.js';
import { te as rawTe } from './locales/te.js';
import { ur as rawUr } from './locales/ur.js';

export * from './types.js';
export * from './languages.js';
export { en } from './en.js';
export { hi } from './hi.js';

// Safe builder ensuring 100% key parity across all 23 official languages
const createLocale = (overrides: Partial<TranslationSchema>): TranslationSchema => ({
  ...en,
  ...overrides,
});

export const as: TranslationSchema = createLocale(rawAs);
export const bn: TranslationSchema = createLocale(rawBn);
export const brx: TranslationSchema = createLocale(rawBrx);
export const doi: TranslationSchema = createLocale(rawDoi);
export const gu: TranslationSchema = createLocale(rawGu);
export const kn: TranslationSchema = createLocale(rawKn);
export const ks: TranslationSchema = createLocale(rawKs);
export const kok: TranslationSchema = createLocale(rawKok);
export const mai: TranslationSchema = createLocale(rawMai);
export const ml: TranslationSchema = createLocale(rawMl);
export const mni: TranslationSchema = createLocale(rawMni);
export const mr: TranslationSchema = createLocale(rawMr);
export const ne: TranslationSchema = createLocale(rawNe);
export const or: TranslationSchema = createLocale(rawOr);
export const pa: TranslationSchema = createLocale(rawPa);
export const sa: TranslationSchema = createLocale(rawSa);
export const sat: TranslationSchema = createLocale(rawSat);
export const sd: TranslationSchema = createLocale(rawSd);
export const ta: TranslationSchema = createLocale(rawTa);
export const te: TranslationSchema = createLocale(rawTe);
export const ur: TranslationSchema = createLocale(rawUr);

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

// Set of warned missing keys in development to prevent console flooding
const warnedMissingKeys = new Set<string>();

/**
 * Universal translation resolver with:
 * 1. Selected locale resolution
 * 2. Automatic English fallback
 * 3. Development warnings for missing keys to future-proof components
 */
export function getTranslation(key: keyof TranslationSchema, lang: LanguageCode = 'en'): string {
  const selectedLocale = translations[lang] || translations.en;
  const value = selectedLocale?.[key];

  if (typeof value === 'undefined' || value === '') {
    if (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production') {
      const warnKey = `${lang}:${String(key)}`;
      if (!warnedMissingKeys.has(warnKey)) {
        warnedMissingKeys.add(warnKey);
        console.warn(`[i18n Warning] Missing translation key "${String(key)}" for language "${lang}". Fallback used.`);
      }
    }
    return translations.en?.[key] || String(key);
  }

  return value;
}

