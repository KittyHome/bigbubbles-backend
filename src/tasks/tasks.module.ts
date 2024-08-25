import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks.service';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports: [ScheduleModule.forRoot(), CacheModule],
  providers: [TasksService],
})
export class TasksModule {}
