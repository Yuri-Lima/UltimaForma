/**
 * Transcription provider constants.
 */
import type { TranscriptionProviderId } from '../types/transcription.types';

export interface TranscriptionProviderOption {
  id: TranscriptionProviderId;
  labelKey: string;
}

export const TRANSCRIPTION_PROVIDER_OPTIONS: readonly TranscriptionProviderOption[] =
  [
    { id: 'openai', labelKey: 'transcription.openai' },
    { id: 'huggingface', labelKey: 'transcription.huggingface' },
  ] as const;
