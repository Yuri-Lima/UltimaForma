import { Controller, Get } from '@nestjs/common';

@Controller('config')
export class ConfigController {
  @Get()
  getConfig() {
    return {
      aiGenerationEnabled: process.env.ENABLE_AI_GENERATION_UI === 'true',
    };
  }
}
