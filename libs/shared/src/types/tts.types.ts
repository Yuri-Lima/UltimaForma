/**
 * TTS provider types.
 * Single source of truth for provider IDs used across API and web apps.
 */

/** Supported TTS provider identifiers */
export const TTS_PROVIDER_IDS = [
  'openai',
  'huggingface',
  'elevenlabs',
] as const;

export type TtsProviderId = (typeof TTS_PROVIDER_IDS)[number];

/** Type guard to check if a string is a valid TtsProviderId */
export function isTtsProviderId(value: string): value is TtsProviderId {
  return (TTS_PROVIDER_IDS as readonly string[]).includes(value);
}

/** Provider-specific config (plan, output format, etc.). Extensible per provider. */
export interface TtsProviderConfig {
  /** ElevenLabs: 'free' | 'starter' | 'pro' | 'scale' | 'business' */
  plan?: string;
  /** Explicit output format override (e.g. 'mp3_44100_128' | 'wav_44100') */
  outputFormat?: string;
  [key: string]: unknown;
}
