import { Module } from '@nestjs/common';
import { ServicesModule } from '@src/services/services.module';
import { StatController } from './stat.controller';

@Module({
    imports: [ServicesModule],
    controllers: [StatController],
})
export class StatModule {}
