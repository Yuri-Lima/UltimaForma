/**
 * TTS provider constants.
 * Shared across API and web apps for type-safe provider options.
 */
import type { TtsProviderId } from '../types/tts.types';

export interface TtsProviderOption {
  id: TtsProviderId;
  labelKey: string;
}

export const TTS_PROVIDER_OPTIONS: readonly TtsProviderOption[] = [
  { id: 'openai', labelKey: 'tts.openai' },
  { id: 'huggingface', labelKey: 'tts.huggingface' },
  { id: 'elevenlabs', labelKey: 'tts.elevenlabs' },
] as const;

/** OpenAI TTS voice options */
export const OPENAI_TTS_VOICES = [
  'alloy',
  'ash',
  'ballad',
  'coral',
  'echo',
  'fable',
  'nova',
  'onyx',
  'sage',
  'shimmer',
  'verse',
  'marin',
  'cedar',
] as const;

export type OpenAITtsVoice = (typeof OPENAI_TTS_VOICES)[number];
