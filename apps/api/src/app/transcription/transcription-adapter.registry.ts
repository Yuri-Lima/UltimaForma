import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  TRANSCRIPTION_PROVIDER_IDS,
  type TranscriptionProviderId,
} from '@ultima-forma/shared';
import type { ITranscriptionAdapter } from './interfaces/transcription-adapter.interface';
import { OpenAITranscriptionAdapter } from './adapters/openai-transcription.adapter';
import { HuggingFaceTranscriptionAdapter } from './adapters/huggingface-transcription.adapter';

const ADAPTER_FACTORIES: Partial<
  Record<
    TranscriptionProviderId,
    (config: ConfigService) => ITranscriptionAdapter | null
  >
> = {
  openai: (config) => new OpenAITranscriptionAdapter(config),
  huggingface: (config) => new HuggingFaceTranscriptionAdapter(config),
};

@Injectable()
export class TranscriptionAdapterRegistry {
  private readonly adapters = new Map<
    TranscriptionProviderId,
    ITranscriptionAdapter
  >();

  constructor(private configService: ConfigService) {
    this.registerAvailableAdapters();
  }

  private registerAvailableAdapters(): void {
    for (const id of TRANSCRIPTION_PROVIDER_IDS) {
      try {
        const factory = ADAPTER_FACTORIES[id];
        if (factory) {
          const adapter = factory(this.configService);
          if (adapter) {
            this.adapters.set(id, adapter);
          }
        }
      } catch {
        // Skip adapters that fail to initialize
      }
    }
  }

  get(providerId: string): ITranscriptionAdapter | undefined {
    return this.adapters.get(providerId as TranscriptionProviderId);
  }

  getAvailableIds(): TranscriptionProviderId[] {
    return Array.from(this.adapters.keys());
  }

  getDefaultProviderId(): TranscriptionProviderId {
    const env = this.configService.get<string>(
      'DEFAULT_TRANSCRIPTION_PROVIDER',
      'openai'
    );
    if (
      TRANSCRIPTION_PROVIDER_IDS.includes(env as TranscriptionProviderId) &&
      this.adapters.has(env as TranscriptionProviderId)
    ) {
      return env as TranscriptionProviderId;
    }
    const first = this.adapters.keys().next().value;
    if (first) return first;
    throw new Error(
      'No transcription adapter registered. Configure API keys (OPENAI_API_KEY or HF_TTS_API_KEY).'
    );
  }
}
