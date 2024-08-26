import { Module } from '@nestjs/common';
import { PlaygroundService } from './playground.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Playground, PlaygroundSchema } from './playground.schema';
import { CacheModule } from 'src/cache/cache.module';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Playground.name, schema: PlaygroundSchema },
    ]),
    CacheModule,
    ProfileModule,
  ],
  providers: [PlaygroundService],
  exports: [PlaygroundService],
})
export class PlaygroundModule {}
