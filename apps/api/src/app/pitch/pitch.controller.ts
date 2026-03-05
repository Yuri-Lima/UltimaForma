import {
  Controller,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { PitchExplainService } from './pitch-explain.service';
import {
  ExplainSectionBodyDto,
  AskFollowUpBodyDto,
  isPitchSectionId,
} from '@ultima-forma/shared';

@Controller('pitch')
export class PitchController {
  constructor(private readonly pitchExplainService: PitchExplainService) {}

  @Post('explain-section')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  async explainSection(@Body() body: ExplainSectionBodyDto) {
    if (!isPitchSectionId(body.sectionId)) {
      throw new BadRequestException(`Invalid section ID: ${body.sectionId}`);
    }

    const explanation = await this.pitchExplainService.explainSection(
      body.sectionId,
      body.lang
    );

    return { explanation };
  }

  @Post('ask-follow-up')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  async askFollowUp(@Body() body: AskFollowUpBodyDto) {
    if (!isPitchSectionId(body.sectionId)) {
      throw new BadRequestException(`Invalid section ID: ${body.sectionId}`);
    }

    const history = body.conversationHistory?.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    const explanation = await this.pitchExplainService.askFollowUp(
      body.sectionId,
      body.userMessage,
      history,
      body.lang
    );

    return { explanation };
  }
}
