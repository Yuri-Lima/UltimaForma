import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import {
  getAudioExtensionFromMime,
  TRANSCRIPTION_PROVIDER_IDS,
  type TranscriptionResult,
} from '@ultima-forma/shared';
import type {
  ITranscriptionAdapter,
  TranscriptionOptions,
} from '../interfaces/transcription-adapter.interface';

export class OpenAITranscriptionAdapter implements ITranscriptionAdapter {
  readonly id = TRANSCRIPTION_PROVIDER_IDS[0]; // 'openai'
  private readonly model = 'whisper-1';

  constructor(private configService: ConfigService) {}

  private resolveApiKey(options?: TranscriptionOptions): string {
    const fromOptions = options?.apiKey?.trim();
    if (fromOptions) return fromOptions;
    const envKey = this.configService.get<string>('OPENAI_API_KEY');
    if (envKey?.trim()) return envKey;
    throw new Error(
      'OpenAI transcription requires an API key. Set OPENAI_API_KEY in env.'
    );
  }

  async transcribe(
    audioBuffer: Buffer,
    mimeType: string,
    options?: TranscriptionOptions
  ): Promise<TranscriptionResult> {
    const apiKey = this.resolveApiKey(options);
    const client = new OpenAI({ apiKey });
    const ext = getAudioExtensionFromMime(mimeType);
    const file = new File([new Uint8Array(audioBuffer)], `audio.${ext}`, {
      type: mimeType,
    });

    const transcription = await client.audio.transcriptions.create(
      {
        file,
        model: this.model,
        language: options?.language?.split('-')[0] ?? undefined,
      },
      options?.signal ? { signal: options.signal } : undefined
    );

    return {
      text: transcription.text?.trim() ?? '',
      provider: this.id,
    };
  }
}
