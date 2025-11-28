import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@nestjs/config';
import { LoggerMorganMiddleware } from '@src/shared/logger/middlewares/logger-morgan.middleware';
import { HealthCheckModule } from '@src/modules/healthcheck/healthcheck.module';
import { ExpensesModule } from '@src/modules/expenses/expenses.module';
import { LoggerModule } from '@src/shared/logger/logger.module';
import { ServicesModule } from '@src/services/services.module';
import { DatabaseModule } from '@src/database/database.module';
import { UserIdModule } from '@src/shared/user/user.module';
import { AuthModule } from '@src/modules/auth/auth.module';
import { StatModule } from '@src/modules/stat/stat.module';
import { TagModule } from '@src/modules/tag/tag.module';
import configuration from '@src/config/configuration';

@Module({
    imports: [
        TerminusModule,
        ConfigModule.forRoot({
            envFilePath: `${__dirname}/../envs/.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`,
            load: [configuration],
            isGlobal: true,
        }),

        DatabaseModule,
        ServicesModule,
        LoggerModule,
        UserIdModule,
        HealthCheckModule,
        AuthModule,
        ExpensesModule,
        StatModule,
        TagModule,
    ],
    controllers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(LoggerMorganMiddleware).forRoutes('*');
    }
}
