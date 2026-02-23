import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import Redis from 'ioredis';
import * as bcrypt from 'bcrypt';
import * as speakeasy from 'speakeasy';
import * as crypto from 'crypto';
import { User } from '../users/user.entity';
import { RefreshToken } from '../refresh-token/refresh-token.entity';
import { REDIS_CLIENT } from '../redis/redis.constants';
import { encrypt, decrypt } from './utils/encryption.util';

const BCRYPT_ROUNDS = 12;
const LOCKOUT_TTL = 900; // 15 min
const FAILURES_TTL = 900;
const MAX_FAILURES = 5;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(RefreshToken)
    private refreshTokenRepo: Repository<RefreshToken>,
    @Inject(REDIS_CLIENT)
    private redis: Redis,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    const existing = await this.userRepo.findOne({ where: { email } });
    if (existing) {
      throw new ConflictException('Email already registered');
    }
    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
    const user = await this.userRepo.save({
      email,
      passwordHash,
      mfaEnabled: false,
    });
    const payload = { sub: user.id, email: user.email, mfaRequired: true };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: 900,
    });
    return {
      accessToken,
      mfaRequired: true,
      user: { id: user.id, email: user.email },
    };
  }

  async login(email: string, password: string) {
    const lockKey = `auth:lockout:${email}`;
    const locked = await this.redis.get(lockKey);
    if (locked) {
      throw new ForbiddenException('Account temporarily locked. Try again later.');
    }

    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      await this.recordFailedAttempt(email);
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      await this.recordFailedAttempt(email);
      throw new UnauthorizedException('Invalid credentials');
    }

    await this.redis.del(`auth:failures:${email}`);

    if (user.mfaEnabled) {
      const payload = {
        sub: user.id,
        email: user.email,
        mfaRequired: true,
      };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: 900,
    });
      return {
        accessToken,
        mfaRequired: true,
        user: { id: user.id, email: user.email },
      };
    }

    return this.issueTokens(user);
  }

  private async recordFailedAttempt(email: string): Promise<void> {
    const key = `auth:failures:${email}`;
    const count = await this.redis.incr(key);
    if (count === 1) {
      await this.redis.expire(key, FAILURES_TTL);
    }
    if (count >= MAX_FAILURES) {
      await this.redis.setex(`auth:lockout:${email}`, LOCKOUT_TTL, '1');
    }
  }

  async mfaSetup(userId: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new UnauthorizedException();
    if (user.mfaEnabled) {
      throw new BadRequestException('MFA already enabled');
    }

    const secret = speakeasy.generateSecret({
      name: `Ultima Forma (${user.email})`,
      issuer: 'Ultima Forma',
    });

    const encrypted = encrypt(secret.base32);
    await this.userRepo.update(userId, { mfaSecret: encrypted });

    return {
      otpauthUrl: secret.otpauth_url!,
      secret: secret.base32,
    };
  }

  async mfaVerify(userId: string, code: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user || !user.mfaSecret) {
      throw new BadRequestException('MFA not set up');
    }
    const secret = decrypt(user.mfaSecret);
    const valid = speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token: code,
      window: 1,
    });
    if (!valid) {
      throw new UnauthorizedException('Invalid code');
    }
    await this.userRepo.update(userId, { mfaEnabled: true });
    return this.issueTokens(user);
  }

  async mfaValidate(userId: string, code: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user || !user.mfaSecret || !user.mfaEnabled) {
      throw new UnauthorizedException();
    }
    const secret = decrypt(user.mfaSecret);
    const valid = speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token: code,
      window: 1,
    });
    if (!valid) {
      throw new UnauthorizedException('Invalid code');
    }
    return this.issueTokens(user);
  }

  private async issueTokens(user: User) {
    const payload = { sub: user.id, email: user.email, mfaRequired: false };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: 900,
    });
    const refreshToken = crypto.randomBytes(48).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
    const expiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '7d';
    const expiresMs = this.parseExpiry(expiresIn);
    await this.refreshTokenRepo.save({
      userId: user.id,
      tokenHash,
      expiresAt: new Date(Date.now() + expiresMs),
    });
    return {
      accessToken,
      refreshToken,
      mfaRequired: false,
      user: { id: user.id, email: user.email },
    };
  }

  private parseExpiry(s: string): number {
    const match = s.match(/^(\d+)([smhd])$/);
    if (!match) return 7 * 24 * 60 * 60 * 1000;
    const n = parseInt(match[1], 10);
    const u = match[2];
    const multipliers: Record<string, number> = {
      s: 1000,
      m: 60 * 1000,
      h: 60 * 60 * 1000,
      d: 24 * 60 * 60 * 1000,
    };
    return n * (multipliers[u] || 86400000);
  }

  async refresh(refreshToken: string) {
    const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
    const tokenRecord = await this.refreshTokenRepo.findOne({
      where: { tokenHash },
      relations: ['user'],
    });
    if (
      !tokenRecord ||
      tokenRecord.revokedAt ||
      new Date() > tokenRecord.expiresAt
    ) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    await this.refreshTokenRepo.update(tokenRecord.id, {
      revokedAt: new Date(),
    });
    return this.issueTokens(tokenRecord.user);
  }

  async logout(userId: string, refreshToken?: string) {
    if (refreshToken) {
      const tokenHash = crypto
        .createHash('sha256')
        .update(refreshToken)
        .digest('hex');
      await this.refreshTokenRepo.update(
        { tokenHash },
        { revokedAt: new Date() },
      );
    } else {
      await this.refreshTokenRepo.update(
        { userId },
        { revokedAt: new Date() },
      );
    }
    return { success: true };
  }

  async validateUser(userId: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { id: userId } });
  }
}
