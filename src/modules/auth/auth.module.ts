import { Module } from '@nestjs/common';
import { ServicesModule } from '@src/services/services.module';
import { AuthController } from './auth.controller';

@Module({
    imports: [ServicesModule],
    controllers: [AuthController],
})
export class AuthModule {}
