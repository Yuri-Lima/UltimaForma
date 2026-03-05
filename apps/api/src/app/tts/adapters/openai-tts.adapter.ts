import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { TTS_PROVIDER_IDS, type TtsProviderId } from '@ultima-forma/shared';
import { OPENAI_TTS_VOICES } from '@ultima-forma/shared';
import type { ITtsAdapter, TtsSynthesizeOptions } from '../interfaces/tts-adapter.interface';

const DEFAULT_VOICE = 'coral';
const MODEL = 'gpt-4o-mini-tts';

export class OpenAITtsAdapter implements ITtsAdapter {
  readonly id: TtsProviderId = TTS_PROVIDER_IDS[0]; // 'openai'

  constructor(private configService: ConfigService) {}

  private resolveApiKey(options?: TtsSynthesizeOptions): string {
    const key = options?.apiKey?.trim();
    if (key) return key;
    const envKey = this.configService.get<string>('OPENAI_API_KEY');
    if (envKey?.trim()) return envKey;
    throw new Error(
      'OpenAI TTS requires an API key. Set OPENAI_API_KEY in env.'
    );
  }

  async synthesize(
    text: string,
    options?: TtsSynthesizeOptions
  ): Promise<Buffer> {
    const apiKey = this.resolveApiKey(options);
    const client = new OpenAI({ apiKey });
    const voice =
      (options?.voice?.trim() as (typeof OPENAI_TTS_VOICES)[number]) ||
      DEFAULT_VOICE;

    const response = await client.audio.speech.create(
      {
        model: MODEL,
        voice,
        input: text,
        response_format: 'wav',
      },
      options?.signal ? { signal: options.signal } : undefined
    );

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }
}
