import { Module } from '@nestjs/common';
import { VectorSearchService } from './vector.service';

@Module({
  providers: [VectorSearchService],
  exports: [VectorSearchService],
})
export class VectorModule {}
