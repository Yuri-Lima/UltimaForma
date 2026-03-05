/**
 * Transcription provider types.
 * Single source of truth for provider IDs used across API and web apps.
 */

/** Supported transcription provider identifiers */
export const TRANSCRIPTION_PROVIDER_IDS = ['openai', 'huggingface'] as const;

export type TranscriptionProviderId =
  (typeof TRANSCRIPTION_PROVIDER_IDS)[number];

/** Type guard to check if a string is a valid TranscriptionProviderId */
export function isTranscriptionProviderId(
  value: string
): value is TranscriptionProviderId {
  return (TRANSCRIPTION_PROVIDER_IDS as readonly string[]).includes(value);
}

export interface TranscriptionResult {
  text: string;
  provider?: string;
}
