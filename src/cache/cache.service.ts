import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

  async set(key: string, value: string): Promise<void> {
    await this.cacheManager.set(key, value);
  }

  async get(key: string): Promise<string> {
    return await this.cacheManager.get(key);
  }

  async getAllKeys(): Promise<string[]> {
    const keys = await this.cacheManager.store.keys();
    return keys;
  }

  async getAllData(): Promise<{ [key: string]: string }> {
    const keys = await this.getAllKeys();
    const data = {};
    for (const key of keys) {
      data[key] = await this.get(key);
    }
    return data;
  }

  async remove(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }
}
