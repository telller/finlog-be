import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';
import { LoggerMorganMiddleware } from '@src/shared/logger/middlewares/logger-morgan.middleware';
import { HealthCheckModule } from '@src/modules/healthcheck/healthcheck.module';
import { LoggerModule } from '@src/shared/logger/logger.module';
import { ServicesModule } from '@src/services/services.module';
import { DatabaseModule } from '@src/database/database.module';
import { UserIdModule } from '@src/shared/user/user.module';
import { TagModule } from '@src/modules/tag/tag.module';
import configuration from '@src/config/configuration';

const WORK_DIR = `${__dirname}/..`;
const ENVS_DIR = `${WORK_DIR}/envs`;

@Module({
    imports: [
        TerminusModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: process.env.NODE_ENV
                ? path.join(ENVS_DIR, `/.env.${process.env.NODE_ENV}`)
                : path.join(ENVS_DIR, '/.env'),
            load: [configuration],
        }),
        DatabaseModule,
        ServicesModule,
        LoggerModule,
        UserIdModule,
        HealthCheckModule,
        TagModule,
    ],
    controllers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(LoggerMorganMiddleware).forRoutes('*');
    }
}
