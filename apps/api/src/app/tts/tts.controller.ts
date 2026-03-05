import {
  Controller,
  Post,
  Get,
  Body,
  BadRequestException,
  StreamableFile,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { TtsService } from './tts.service';
import { ProviderResolverService } from '../provider-resolver/provider-resolver.service';
import { SynthesizeBodyDto } from '@ultima-forma/shared';

@Controller('tts')
export class TtsController {
  constructor(
    private readonly ttsService: TtsService,
    private readonly resolver: ProviderResolverService
  ) {}

  @Post('synthesize')
  @Throttle({ default: { limit: 15, ttl: 60000 } })
  async synthesize(@Body() body: SynthesizeBodyDto): Promise<StreamableFile> {
    const resolved = this.resolver.resolveTtsProvider(
      body.providerId as 'openai' | 'huggingface' | 'elevenlabs' | undefined
    );
    if (!resolved) {
      throw new BadRequestException(
        'No TTS API key configured. Set OPENAI_API_KEY, HF_TTS_API_KEY, or ELEVENLABS_API_KEY.'
      );
    }

    const buffer = await this.ttsService.synthesize(body.text, {
      providerId: resolved.providerId,
      apiKey: resolved.apiKey,
      language: body.language || 'en',
      voice: body.voice,
      providerConfig: resolved.config,
    });

    const plan = (resolved.config as { plan?: string })?.plan?.toLowerCase();
    const isElevenLabsPro =
      resolved.providerId === 'elevenlabs' &&
      ['pro', 'scale', 'business'].includes(plan ?? '');
    const contentType =
      resolved.providerId === 'elevenlabs' && !isElevenLabsPro
        ? 'audio/mpeg'
        : 'audio/wav';

    return new StreamableFile(buffer, {
      type: contentType,
      disposition: 'inline',
    });
  }

  @Get('providers')
  getProviders() {
    return {
      providers: this.ttsService.getAvailableProviderIds(),
      default: this.ttsService.getDefaultProviderId(),
    };
  }
}
