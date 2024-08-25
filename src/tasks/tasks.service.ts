import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class TasksService {
  constructor(private readonly cacheService: CacheService) {}

  @Cron('0 * * * * *') // Runs every minute
  async handleCron() {
    const data = await this.cacheService.getAllData();
    // Store data into the database
    console.log('Storing data into the database:', data);
    // Implement your database storage logic here
  }
}
