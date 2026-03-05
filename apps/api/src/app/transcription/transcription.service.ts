import { Injectable, Logger } from '@nestjs/common';
import {
  type TranscriptionProviderId,
  type TranscriptionResult,
} from '@ultima-forma/shared';
import type { ITranscriptionAdapter } from './interfaces/transcription-adapter.interface';
import { TranscriptionAdapterRegistry } from './transcription-adapter.registry';
import { abortAsPromise } from '../common/utils/abort-promise';

const TIMEOUT_MS = 120_000;

@Injectable()
export class TranscriptionService {
  private readonly logger = new Logger(TranscriptionService.name);

  constructor(private readonly registry: TranscriptionAdapterRegistry) {}

  async transcribe(
    audioBuffer: Buffer,
    mimeType: string,
    options?: {
      language?: string;
      providerId?: TranscriptionProviderId;
      apiKey?: string;
      signal?: AbortSignal;
    }
  ): Promise<TranscriptionResult> {
    let adapter: ITranscriptionAdapter;
    if (options?.providerId) {
      const p = this.registry.get(options.providerId);
      if (p) {
        adapter = p;
      } else {
        adapter = this.registry.get(
          this.registry.getDefaultProviderId()
        ) as ITranscriptionAdapter;
      }
    } else {
      adapter = this.registry.get(
        this.registry.getDefaultProviderId()
      ) as ITranscriptionAdapter;
    }

    const timeoutPromise = new Promise<TranscriptionResult>((_, reject) =>
      setTimeout(
        () => {
          this.logger.warn(
            `Transcription timeout: provider=${adapter.id} audioSize=${audioBuffer.length} mimeType=${mimeType}`
          );
          reject(
            new Error(
              `Transcription timeout after ${TIMEOUT_MS}ms (provider=${adapter.id})`
            )
          );
        },
        TIMEOUT_MS
      )
    );

    const transcribePromise = adapter.transcribe(audioBuffer, mimeType, {
      language: options?.language,
      apiKey: options?.apiKey,
      signal: options?.signal,
    });

    const abortPromise = abortAsPromise(options?.signal);

    const result = await Promise.race([
      transcribePromise,
      abortPromise,
      timeoutPromise,
    ]);
    this.logger.debug(
      `Transcription completed (provider=${adapter.id}, size=${audioBuffer.length})`
    );
    return result;
  }

  getAvailableProviderIds(): TranscriptionProviderId[] {
    return this.registry.getAvailableIds();
  }

  getDefaultProviderId(): TranscriptionProviderId {
    return this.registry.getDefaultProviderId();
  }
}
