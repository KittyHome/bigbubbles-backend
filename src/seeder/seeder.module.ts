import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { PlaygroundModule } from 'src/playground/playground.module';
import { ColorsModule } from 'src/colors/colors.module';

@Module({
  imports: [ColorsModule, PlaygroundModule],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
