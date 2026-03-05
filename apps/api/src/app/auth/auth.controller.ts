import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  LoginDto,
  RegisterDto,
  MfaVerifyDto,
  RefreshDto,
} from '@ultima-forma/shared';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

interface RequestWithUser {
  user: { userId: string; email: string; mfaRequired?: boolean };
  body?: { refreshToken?: string };
}

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    try {
      return await this.authService.register(dto.email, dto.password);
    } catch (err) {
      this.logger.error('Registration failed', err instanceof Error ? err.stack : err);
      const msg = err instanceof Error ? err.message : 'Registration failed';
      throw new InternalServerErrorException(msg);
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }

  @Post('mfa/setup')
  @UseGuards(JwtAuthGuard)
  async mfaSetup(@Request() req: RequestWithUser) {
    return this.authService.mfaSetup(req.user.userId);
  }

  @Post('mfa/verify')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async mfaVerify(@Request() req: RequestWithUser, @Body() dto: MfaVerifyDto) {
    return this.authService.mfaVerify(req.user.userId, dto.code);
  }

  @Post('mfa/validate')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async mfaValidate(@Request() req: RequestWithUser, @Body() dto: MfaVerifyDto) {
    return this.authService.mfaValidate(req.user.userId, dto.code);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() dto: RefreshDto) {
    return this.authService.refresh(dto.refreshToken);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(
    @Request() req: RequestWithUser,
    @Body('refreshToken') refreshToken?: string,
  ) {
    return this.authService.logout(req.user.userId, refreshToken);
  }
}
