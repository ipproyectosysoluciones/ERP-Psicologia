import { Controller, Get } from '@nestjs/common';
import type { HealthCheck } from '@erp/shared';

@Controller('health')
export class HealthController {
  @Get()
  check(): HealthCheck {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
