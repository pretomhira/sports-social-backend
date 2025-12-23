import { Inject, Injectable } from '@nestjs/common';
import Keyv from 'keyv';
import { KEYV_INSTANCE } from './redis.module';

@Injectable()
export class RedisService {
  constructor(@Inject(KEYV_INSTANCE) private readonly keyv: Keyv) {}

  get<T>(key: string) {
    return this.keyv.get<T>(key);
  }

  set<T>(key: string, value: T, ttlMs?: number) {
    return this.keyv.set(key, value, ttlMs);
  }

  delete(key: string) {
    return this.keyv.delete(key);
  }

  clear() {
    return this.keyv.clear();
  }
}
