import { Module } from '@nestjs/common';
import { PatternsService } from './patterns.service';

@Module({
  providers: [PatternsService]
})
export class PatternsModule {}
