import type {
  TtsProviderId,
  TtsProviderConfig,
} from '@ultima-forma/shared';

export interface TtsSynthesizeOptions {
  language?: string;
  apiKey?: string;
  voice?: string;
  providerConfig?: TtsProviderConfig;
  signal?: AbortSignal;
}

export interface ITtsAdapter {
  readonly id: TtsProviderId;
  synthesize(text: string, options?: TtsSynthesizeOptions): Promise<Buffer>;
}
