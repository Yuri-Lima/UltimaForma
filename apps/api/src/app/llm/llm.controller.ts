import { Controller, Get } from '@nestjs/common';
import { LlmService } from './llm.service';

@Controller('llm')
export class LlmController {
  constructor(private readonly llmService: LlmService) {}

  @Get('providers')
  getProviders() {
    return {
      providers: this.llmService.getAvailableProviderIds(),
      default: this.llmService.getDefaultProviderId(),
    };
  }
}
