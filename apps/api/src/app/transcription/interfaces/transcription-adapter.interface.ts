import type {
  TranscriptionProviderId,
  TranscriptionResult,
} from '@ultima-forma/shared';

export interface TranscriptionOptions {
  language?: string;
  apiKey?: string;
  signal?: AbortSignal;
}

export interface ITranscriptionAdapter {
  readonly id: TranscriptionProviderId;
  transcribe(
    audioBuffer: Buffer,
    mimeType: string,
    options?: TranscriptionOptions
  ): Promise<TranscriptionResult>;
}
