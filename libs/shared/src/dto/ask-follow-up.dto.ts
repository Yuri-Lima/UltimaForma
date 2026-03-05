import {
  ArrayMaxSize,
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  ValidateBy,
} from 'class-validator';
import { PITCH_SECTION_IDS } from '../constants/pitch';

function conversationHistoryValidator(arr: unknown): boolean {
  if (!Array.isArray(arr)) return true;
  if (arr.length > 10) return false;
  for (const item of arr) {
    if (!item || typeof item !== 'object') return false;
    const o = item as Record<string, unknown>;
    if (o['role'] !== 'user' && o['role'] !== 'assistant') return false;
    const content = o['content'];
    if (typeof content !== 'string' || content.length > 2000) return false;
  }
  return true;
}

export class AskFollowUpBodyDto {
  @IsString()
  @IsIn([...PITCH_SECTION_IDS])
  sectionId!: string;

  @IsString()
  @MaxLength(500)
  userMessage!: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @ValidateBy({
    name: 'conversationHistory',
    validator: {
      validate: (value: unknown) => conversationHistoryValidator(value),
      defaultMessage: () => 'Invalid conversation history',
    },
  })
  conversationHistory?: { role: 'user' | 'assistant'; content: string }[];

  @IsOptional()
  @IsString()
  @MaxLength(10)
  lang?: string;
}
