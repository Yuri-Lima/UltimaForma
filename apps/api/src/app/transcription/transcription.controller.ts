import {
  Controller,
  Post,
  Get,
  Body,
  BadRequestException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Throttle } from '@nestjs/throttler';
import { TranscriptionService } from './transcription.service';
import { AudioValidationService } from './audio-validation.service';
import { ProviderResolverService } from '../provider-resolver/provider-resolver.service';
import { TranscribeBodyDto } from '@ultima-forma/shared';

@Controller('transcription')
export class TranscriptionController {
  constructor(
    private readonly transcriptionService: TranscriptionService,
    private readonly audioValidation: AudioValidationService,
    private readonly resolver: ProviderResolverService
  ) {}

  @Post('transcribe')
  @Throttle({ default: { limit: 15, ttl: 60000 } })
  @UseInterceptors(FileInterceptor('audio'))
  async transcribe(
    @UploadedFile()
    file: { buffer: Buffer; originalname: string; mimetype: string; size: number } | undefined,
    @Body() body: TranscribeBodyDto
  ) {
    if (!file) {
      throw new BadRequestException('Audio file is required');
    }

    const validation = await this.audioValidation.validate(
      file.originalname,
      file.mimetype,
      file.size,
      file.buffer,
      {}
    );
    if (!validation.isValid) {
      throw new BadRequestException(validation.error);
    }

    const effectiveMimeType = await this.audioValidation.getEffectiveMimeType(
      file.mimetype,
      file.buffer,
      {}
    );

    const resolved = this.resolver.resolveTranscriptionProvider();
    if (!resolved) {
      throw new BadRequestException(
        'No transcription API key configured. Set OPENAI_API_KEY or HF_TTS_API_KEY.'
      );
    }

    const result = await this.transcriptionService.transcribe(
      file.buffer,
      effectiveMimeType,
      {
        language: body.language || 'en',
        providerId: resolved.providerId,
        apiKey: resolved.apiKey,
      }
    );

    return { text: result.text };
  }

  @Get('providers')
  getProviders() {
    return {
      providers: this.transcriptionService.getAvailableProviderIds(),
      default: this.transcriptionService.getDefaultProviderId(),
    };
  }
}
