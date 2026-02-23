import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('refresh_token')
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'userId' })
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ name: 'tokenHash' })
  tokenHash: string;

  @Column({ name: 'expiresAt' })
  expiresAt: Date;

  @Column({ name: 'revokedAt', nullable: true })
  revokedAt: Date | null;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;
}
