import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FileTypeModule } from '../file-type/file-type.module';
import { ProviderResolverModule } from '../provider-resolver/provider-resolver.module';
import { TranscriptionAdapterRegistry } from './transcription-adapter.registry';
import { TranscriptionService } from './transcription.service';
import { AudioValidationService } from './audio-validation.service';
import { TranscriptionController } from './transcription.controller';

@Module({
  imports: [ConfigModule, FileTypeModule, ProviderResolverModule],
  controllers: [TranscriptionController],
  providers: [
    TranscriptionAdapterRegistry,
    TranscriptionService,
    AudioValidationService,
  ],
  exports: [TranscriptionService, AudioValidationService],
})
export class TranscriptionModule {}
