import { ConfigService } from '@nestjs/config';
import { InferenceClient } from '@huggingface/inference';
import {
  mapI18nToMlLang,
  TRANSCRIPTION_PROVIDER_IDS,
  type TranscriptionResult,
} from '@ultima-forma/shared';
import { abortAsPromise } from '../../common/utils/abort-promise';
import type {
  ITranscriptionAdapter,
  TranscriptionOptions,
} from '../interfaces/transcription-adapter.interface';

export class HuggingFaceTranscriptionAdapter implements ITranscriptionAdapter {
  readonly id = TRANSCRIPTION_PROVIDER_IDS[1]; // 'huggingface'
  private readonly model = 'openai/whisper-large-v3';

  constructor(private configService: ConfigService) {}

  private resolveToken(options?: TranscriptionOptions): string {
    const fromOptions = options?.apiKey?.trim();
    if (fromOptions) return fromOptions;
    const envKey =
      this.configService.get<string>('HF_TTS_API_KEY') ??
      this.configService.get<string>('HF_INFERENCE_API_KEY');
    if (envKey?.trim()) return envKey;
    throw new Error(
      'HuggingFace transcription requires an API key. Set HF_TTS_API_KEY or HF_INFERENCE_API_KEY in env.'
    );
  }

  private normalizeMimeType(mimeType: string): string {
    const base = mimeType.split(';')[0].trim().toLowerCase();
    if (base === 'audio/mp4') return 'audio/m4a';
    return base;
  }

  async transcribe(
    audioBuffer: Buffer,
    mimeType: string,
    options?: TranscriptionOptions
  ): Promise<TranscriptionResult> {
    const token = this.resolveToken(options);
    const client = new InferenceClient(token);
    const lang = options?.language ? mapI18nToMlLang(options.language) : undefined;
    const normalizedMime = this.normalizeMimeType(mimeType);
    const data = new Blob([new Uint8Array(audioBuffer)], {
      type: normalizedMime,
    });

    const provider =
      this.configService.get<string>('HF_INFERENCE_PROVIDER', 'hf-inference');
    const recognizePromise = (async () => {
      const result = await client.automaticSpeechRecognition({
        model: this.model,
        data,
        provider,
        parameters: lang ? { language: lang } : undefined,
      } as Parameters<typeof client.automaticSpeechRecognition>[0]);

      if (typeof result === 'object' && result !== null && 'text' in result) {
        const text = (result as { text?: string }).text ?? '';
        return { text: text.trim(), provider: this.id };
      }
      const text = typeof result === 'string' ? result : '';
      return { text: text.trim(), provider: this.id };
    })();

    if (options?.signal) {
      return Promise.race([
        recognizePromise,
        abortAsPromise(options.signal),
      ]) as Promise<TranscriptionResult>;
    }
    return recognizePromise;
  }
}
