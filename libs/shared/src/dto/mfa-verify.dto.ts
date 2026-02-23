import { IsString, Length, Matches } from 'class-validator';

export class MfaVerifyDto {
  @IsString()
  @Length(6, 6, { message: 'Code must be 6 digits' })
  @Matches(/^\d{6}$/, { message: 'Code must contain only digits' })
  code!: string;
}
