import { TerminusModule } from '@nestjs/terminus';
import { Module } from '@nestjs/common';
import { HealthCheckController } from './healthcheck.controller';

@Module({
    imports: [TerminusModule],
    controllers: [HealthCheckController],
})
export class HealthCheckModule {}
