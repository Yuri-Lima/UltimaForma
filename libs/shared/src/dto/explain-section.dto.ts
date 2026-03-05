import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import { PITCH_SECTION_IDS } from '../constants/pitch';

export class ExplainSectionBodyDto {
  @IsString()
  @IsIn([...PITCH_SECTION_IDS])
  sectionId!: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  lang?: string;
}
