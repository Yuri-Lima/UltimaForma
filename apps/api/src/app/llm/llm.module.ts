import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LlmAdapterRegistry } from './llm-adapter.registry';
import { LlmService } from './llm.service';
import { LlmController } from './llm.controller';

@Module({
  imports: [ConfigModule],
  controllers: [LlmController],
  providers: [LlmAdapterRegistry, LlmService],
  exports: [LlmService],
})
export class LlmModule {}
