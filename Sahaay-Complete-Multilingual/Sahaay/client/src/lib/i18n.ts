import {
  translations,
  getTranslation,
  LANGUAGES,
  DEFAULT_LANGUAGE,
  LanguageCode,
  LanguageInfo,
  TranslationSchema,
} from '../locales/index.js';

export { LANGUAGES, DEFAULT_LANGUAGE };
export type { LanguageCode, LanguageInfo, TranslationSchema };
export { translations };

export function t(key: keyof TranslationSchema, lang: LanguageCode | string = 'en'): string {
  return getTranslation(key, (lang as LanguageCode) || 'en');
}
