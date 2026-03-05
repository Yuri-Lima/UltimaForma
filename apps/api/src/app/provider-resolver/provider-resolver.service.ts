import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  type TtsProviderId,
  type TranscriptionProviderId,
  type LlmProviderId,
  isTtsProviderId,
  isTranscriptionProviderId,
  isLlmProviderId,
} from '@ultima-forma/shared';

export interface ResolvedProvider<T extends string> {
  providerId: T;
  apiKey: string;
  config?: Record<string, unknown>;
}

@Injectable()
export class ProviderResolverService {
  constructor(private configService: ConfigService) {}

  resolveTtsProvider(providerId?: TtsProviderId): ResolvedProvider<TtsProviderId> | null {
    const id =
      (providerId && isTtsProviderId(providerId)
        ? providerId
        : this.configService.get<string>('DEFAULT_TTS_PROVIDER', 'elevenlabs')) as TtsProviderId;
    const key = this.getTtsApiKey(id);
    if (!key) return null;
    return { providerId: id, apiKey: key };
  }

  private getTtsApiKey(providerId: TtsProviderId): string | null {
    switch (providerId) {
      case 'openai':
        return this.configService.get<string>('OPENAI_API_KEY')?.trim() ?? null;
      case 'huggingface':
        return (
          this.configService.get<string>('HF_TTS_API_KEY')?.trim() ??
          this.configService.get<string>('HF_INFERENCE_API_KEY')?.trim() ??
          null
        );
      case 'elevenlabs':
        return this.configService.get<string>('ELEVENLABS_API_KEY')?.trim() ?? null;
      default:
        return null;
    }
  }

  resolveTranscriptionProvider(
    providerId?: TranscriptionProviderId
  ): ResolvedProvider<TranscriptionProviderId> | null {
    const id =
      (providerId && isTranscriptionProviderId(providerId)
        ? providerId
        : this.configService.get<string>(
            'DEFAULT_TRANSCRIPTION_PROVIDER',
            'openai'
          )) as TranscriptionProviderId;
    const key = this.getTranscriptionApiKey(id);
    if (!key) return null;
    return { providerId: id, apiKey: key };
  }

  private getTranscriptionApiKey(
    providerId: TranscriptionProviderId
  ): string | null {
    switch (providerId) {
      case 'openai':
        return this.configService.get<string>('OPENAI_API_KEY')?.trim() ?? null;
      case 'huggingface':
        return (
          this.configService.get<string>('HF_TTS_API_KEY')?.trim() ??
          this.configService.get<string>('HF_INFERENCE_API_KEY')?.trim() ??
          null
        );
      default:
        return null;
    }
  }

  resolveLlmProvider(providerId?: LlmProviderId): ResolvedProvider<LlmProviderId> | null {
    const id =
      (providerId && isLlmProviderId(providerId)
        ? providerId
        : this.configService.get<string>('DEFAULT_LLM_PROVIDER', 'openai')) as LlmProviderId;
    const key = this.getLlmApiKey(id);
    if (!key && id !== 'ollama') return null;
    // Ollama doesn't need API key
    if (id === 'ollama') {
      const baseUrl = this.configService.get<string>('OLLAMA_BASE_URL');
      return baseUrl ? { providerId: id, apiKey: '' } : null;
    }
    return key ? { providerId: id, apiKey: key } : null;
  }

  private getLlmApiKey(providerId: LlmProviderId): string | null {
    switch (providerId) {
      case 'openai':
        return this.configService.get<string>('OPENAI_API_KEY')?.trim() ?? null;
      case 'anthropic':
        return this.configService.get<string>('ANTHROPIC_API_KEY')?.trim() ?? null;
      case 'ollama':
        return ''; // No key needed
      default:
        return null;
    }
  }
}
