import { Injectable, Logger } from '@nestjs/common';
import type {
  TtsProviderId,
  TtsProviderConfig,
} from '@ultima-forma/shared';
import { TtsAdapterRegistry } from './tts-adapter.registry';
import type { TtsSynthesizeOptions } from './interfaces/tts-adapter.interface';
import { abortAsPromise } from '../common/utils/abort-promise';

const TIMEOUT_MS = 120_000;

@Injectable()
export class TtsService {
  private readonly logger = new Logger(TtsService.name);

  constructor(private readonly registry: TtsAdapterRegistry) {}

  async synthesize(
    text: string,
    options: {
      providerId: TtsProviderId;
      apiKey?: string;
      language?: string;
      voice?: string;
      providerConfig?: TtsProviderConfig;
      signal?: AbortSignal;
    }
  ): Promise<Buffer> {
    const adapter = this.registry.get(options.providerId);
    if (!adapter) {
      throw new Error(
        `TTS adapter '${options.providerId}' not available. Configure API keys.`
      );
    }

    const opts: TtsSynthesizeOptions = {
      apiKey: options.apiKey,
      language: options.language || 'en',
      voice: options.voice,
      providerConfig: options.providerConfig,
      signal: options.signal,
    };

    const timeoutPromise = new Promise<Buffer>((_, reject) =>
      setTimeout(
        () =>
          reject(new Error(`TTS synthesis timeout after ${TIMEOUT_MS}ms`)),
        TIMEOUT_MS
      )
    );

    const synthesizePromise = adapter.synthesize(text, opts);
    const abortPromise = abortAsPromise(options.signal);

    const result = await Promise.race([
      synthesizePromise,
      abortPromise,
      timeoutPromise,
    ]);
    this.logger.debug(
      `TTS synthesis completed (provider=${options.providerId}, size=${result.length})`
    );
    return result;
  }

  getAvailableProviderIds(): TtsProviderId[] {
    return this.registry.getAvailableIds();
  }

  getDefaultProviderId(): TtsProviderId {
    return this.registry.getDefaultProviderId();
  }
}
