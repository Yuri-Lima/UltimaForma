import { IsOptional, IsString, MaxLength } from 'class-validator';

export class TranscribeBodyDto {
  @IsOptional()
  @IsString()
  @MaxLength(10)
  language?: string;
}
