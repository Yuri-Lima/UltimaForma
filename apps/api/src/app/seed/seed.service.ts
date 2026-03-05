import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.entity';

const BCRYPT_ROUNDS = 12;

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async onModuleInit(): Promise<void> {
    const email = process.env.SUPERADMIN_EMAIL;
    const password = process.env.SUPERADMIN_PASSWORD;
    console.log(email, password);
    if (!email || !password) {
      console.log('No superadmin email or password provided');
      return;
    }

    const existing = await this.userRepo.findOne({ where: { email } });
    if (existing) {
      console.log('Superadmin already exists');
      return;
    }

    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
    await this.userRepo.save({
      email,
      passwordHash,
      mfaEnabled: false,
      mfaSecret: null,
    });

    this.logger.log('Superadmin seed completed');
  }
}
