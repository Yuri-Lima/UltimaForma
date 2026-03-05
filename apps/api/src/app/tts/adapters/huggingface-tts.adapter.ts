import { ConfigService } from '@nestjs/config';
import { InferenceClient } from '@huggingface/inference';
import {
  mapI18nToMlLang,
  TTS_PROVIDER_IDS,
  type TtsProviderId,
} from '@ultima-forma/shared';
import { abortAsPromise } from '../../common/utils/abort-promise';
import type { ITtsAdapter, TtsSynthesizeOptions } from '../interfaces/tts-adapter.interface';

const MODEL = 'hexgrad/Kokoro-82M';

export class HuggingFaceTtsAdapter implements ITtsAdapter {
  readonly id: TtsProviderId = TTS_PROVIDER_IDS[1]; // 'huggingface'

  constructor(private readonly configService: ConfigService) {}

  private resolveToken(options?: TtsSynthesizeOptions): string {
    const token = options?.apiKey?.trim();
    if (token) return token;
    const envKey =
      this.configService.get<string>('HF_TTS_API_KEY') ??
      this.configService.get<string>('HF_INFERENCE_API_KEY');
    if (envKey?.trim()) return envKey;
    throw new Error(
      'Hugging Face TTS requires an API key. Set HF_TTS_API_KEY in env.'
    );
  }

  private getProvider(): string {
    return (
      this.configService?.get<string>('HF_TTS_PROVIDER', 'fal-ai') ?? 'fal-ai'
    );
  }

  async synthesize(
    text: string,
    options?: TtsSynthesizeOptions
  ): Promise<Buffer> {
    const token = this.resolveToken(options);
    const client = new InferenceClient(token);
    const lang = options?.language
      ? mapI18nToMlLang(options.language)
      : undefined;

    const synthesizePromise = (async () => {
      const blob = await client.textToSpeech({
        model: MODEL,
        inputs: text,
        provider: this.getProvider(),
        parameters: lang ? { language: lang } : undefined,
      } as Parameters<typeof client.textToSpeech>[0]);
      const arrayBuffer = await blob.arrayBuffer();
      return Buffer.from(arrayBuffer);
    })();

    if (options?.signal) {
      return Promise.race([
        synthesizePromise,
        abortAsPromise(options.signal),
      ]) as Promise<Buffer>;
    }
    return synthesizePromise;
  }
}
