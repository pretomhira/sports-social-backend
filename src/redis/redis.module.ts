import { Global, Module } from '@nestjs/common';
import Keyv from 'keyv';
import KeyvRedis from '@keyv/redis';
import { RedisService } from './redis.service';

export const KEYV_INSTANCE = 'KEYV_INSTANCE';

@Global()
@Module({
  providers: [
    {
      provide: KEYV_INSTANCE,
      useFactory: () => {
        const url = process.env.REDIS_URL;
        const keyv = new Keyv({
          store: new KeyvRedis(url),
          namespace: 'app-cache',
          ttl: 5 * 60 * 1000, // 5 minutes
        });

        keyv.on('error', (err) => {
          console.error('Keyv Redis connection error', err);
        });

        return keyv;
      },
    },
    RedisService,
  ],
  exports: [RedisService, KEYV_INSTANCE],
})
export class RedisModule {}
