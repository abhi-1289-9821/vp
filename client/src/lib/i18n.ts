import {
  translations,
  getTranslation,
  LANGUAGES,
  DEFAULT_LANGUAGE,
  LanguageCode,
  LanguageInfo,
  TranslationSchema,
} from '../locales/index.js';
import { useAuthStore } from '../store/authStore.js';

export { LANGUAGES, DEFAULT_LANGUAGE };
export type { LanguageCode, LanguageInfo, TranslationSchema };
export { translations, getTranslation };

export function t(key: keyof TranslationSchema, lang: LanguageCode | string = 'en'): string {
  return getTranslation(key, (lang as LanguageCode) || 'en');
}

/**
 * Convenient React Hook for components:
 * const { t, language } = useTranslation();
 * t('key') automatically resolves with active Zustand language state.
 */
export function useTranslation() {
  const language = useAuthStore((state) => state.language);
  const translate = (key: keyof TranslationSchema) => getTranslation(key, language);
  return { t: translate, language, getTranslation: translate };
}

