import { Module } from '@nestjs/common';
import { PlaygroundService } from './playground.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Playground, PlaygroundSchema } from './playground.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Playground.name, schema: PlaygroundSchema },
    ]),
  ],
  providers: [PlaygroundService],
  exports: [PlaygroundService],
})
export class PlaygroundModule {}
