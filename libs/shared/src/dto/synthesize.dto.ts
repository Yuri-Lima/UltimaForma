import { IsIn, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { TTS_PROVIDER_IDS, type TtsProviderId } from '../types/tts.types';

export class SynthesizeBodyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  text!: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  language?: string;

  @IsOptional()
  @IsString()
  @IsIn([...TTS_PROVIDER_IDS])
  providerId?: TtsProviderId;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  voice?: string;
}
