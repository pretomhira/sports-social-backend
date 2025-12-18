import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('health')
  health() {
    return { ok: true };
  }

  @Get('db-health')
  async dbHealth() {
    // just checks DB connection works
    await this.prisma.user.findMany({ take: 1 });
    return { db: 'ok' };
  }
}
