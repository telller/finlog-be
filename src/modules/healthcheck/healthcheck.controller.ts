import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { HealthCheckService } from '@nestjs/terminus';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthCheckController {
    constructor(private health: HealthCheckService) {}

    @Get('/healthcheck')
    @ApiExcludeEndpoint()
    getHealthCheck(): object {
        return this.health.check([]);
    }
}
