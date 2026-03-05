/**
 * LLM provider types.
 * Single source of truth for provider IDs and chat/embedding contracts.
 */

/** Supported LLM provider identifiers */
export const LLM_PROVIDER_IDS = ['openai', 'anthropic', 'ollama'] as const;

export type LlmProviderId = (typeof LLM_PROVIDER_IDS)[number];

/** Type guard to check if a string is a valid LlmProviderId */
export function isLlmProviderId(value: string): value is LlmProviderId {
  return (LLM_PROVIDER_IDS as readonly string[]).includes(value);
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface LlmChatOptions {
  model?: string;
  maxTokens?: number;
  temperature?: number;
  signal?: AbortSignal;
}

export interface LlmEmbeddingOptions {
  model?: string;
  signal?: AbortSignal;
}

export interface ChatCompletionResult {
  content: string;
  model?: string;
  usage?: { promptTokens: number; completionTokens: number };
}
