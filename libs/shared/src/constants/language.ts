/**
 * Language mapping for ML models (Whisper, TTS).
 */

/** Supported i18n locale codes */
export const SUPPORTED_LOCALE_CODES = ['en', 'es', 'pt-BR', 'pt', 'de'] as const;

export type SupportedLocaleCode = (typeof SUPPORTED_LOCALE_CODES)[number];

/**
 * Maps app i18n locale codes to ML model language codes.
 */
export const I18N_TO_ML_LANG: Record<SupportedLocaleCode, string> = {
  en: 'en',
  es: 'es',
  'pt-BR': 'pt',
  pt: 'pt',
  de: 'de',
};

/** Map i18n locale to model language. Falls back to first segment or 'en'. */
export function mapI18nToMlLang(i18nLang: string): string {
  const mapped = I18N_TO_ML_LANG[i18nLang as SupportedLocaleCode];
  return mapped ?? i18nLang.split('-')[0] ?? 'en';
}
