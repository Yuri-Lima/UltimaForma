import type {
  ChatMessage,
  ChatCompletionResult,
  LlmChatOptions,
  LlmEmbeddingOptions,
} from '@ultima-forma/shared';

export interface ILlmAdapter {
  readonly id: string;
  chatCompletion(
    messages: ChatMessage[],
    options?: LlmChatOptions
  ): Promise<ChatCompletionResult>;
  createEmbedding?(
    text: string,
    options?: LlmEmbeddingOptions
  ): Promise<number[]>;
}
