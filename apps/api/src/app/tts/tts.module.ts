import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TtsAdapterRegistry } from './tts-adapter.registry';
import { TtsService } from './tts.service';
import { TtsController } from './tts.controller';
import { ProviderResolverModule } from '../provider-resolver/provider-resolver.module';

@Module({
  imports: [ConfigModule, ProviderResolverModule],
  controllers: [TtsController],
  providers: [TtsAdapterRegistry, TtsService],
  exports: [TtsService],
})
export class TtsModule {}
