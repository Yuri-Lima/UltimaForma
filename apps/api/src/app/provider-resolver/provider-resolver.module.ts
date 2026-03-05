import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProviderResolverService } from './provider-resolver.service';

@Module({
  imports: [ConfigModule],
  providers: [ProviderResolverService],
  exports: [ProviderResolverService],
})
export class ProviderResolverModule {}
