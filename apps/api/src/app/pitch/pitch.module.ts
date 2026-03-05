import { Module } from '@nestjs/common';
import { PitchController } from './pitch.controller';
import { PitchExplainService } from './pitch-explain.service';
import { LlmModule } from '../llm/llm.module';

@Module({
  imports: [LlmModule],
  controllers: [PitchController],
  providers: [PitchExplainService],
})
export class PitchModule {}
