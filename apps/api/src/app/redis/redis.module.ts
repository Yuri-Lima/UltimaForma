import { Global, Module } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from './redis.constants';

const redisProvider = {
  provide: REDIS_CLIENT,
  useFactory: () => {
    const host = process.env.REDIS_HOST || 'localhost';
    const port = +(process.env.REDIS_PORT || 6379);
    const password = process.env.REDIS_PASSWORD || undefined;
    return new Redis({
      host,
      port,
      password: password || undefined,
    });
  },
};

@Global()
@Module({
  providers: [redisProvider],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}
