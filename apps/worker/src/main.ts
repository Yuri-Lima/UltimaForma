import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  Logger.log('Worker started - consuming BullMQ tasks from Redis');
  await app.init();
}

bootstrap().catch((err) => {
  Logger.error('Worker failed to start', err);
  process.exit(1);
});
