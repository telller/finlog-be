import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';
import isBetween from 'dayjs/plugin/isBetween';
import timezone from 'dayjs/plugin/timezone';
import { NestFactory } from '@nestjs/core';
import utc from 'dayjs/plugin/utc';
import helmet from 'helmet';
import dayjs from 'dayjs';
import { GlobalExceptionFilter } from '@src/common/filters/globalExceptionFilter';
import { USER_ID_HEADER } from '@src/shared/user/constants/user.constant';
import { Logger as AppLogger } from '@src/shared/logger/logger.service';
import { AppConfig } from '@src/config/interfaces/config.interface';
import { ResponseModel } from '@src/common/models/response.model';
import { AppModule } from '@src/app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger: ['error', 'warn', 'log'],
        bufferLogs: true,
    });
    const configService = app.get<ConfigService>(ConfigService);
    const logger = app.get(AppLogger);
    app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.useGlobalFilters(new GlobalExceptionFilter());
    app.setGlobalPrefix('api');
    app.enableCors({ origin: '*' });
    app.useLogger(logger);

    dayjs.extend(isBetween);
    dayjs.extend(timezone);
    dayjs.extend(utc);

    app.use(
        helmet({
            xFrameOptions: { action: 'deny' },
            contentSecurityPolicy: {
                directives: {
                    'frame-ancestors': "'none'",
                },
            },
        }),
    );

    if (process.env.SWAGGER === 'on') {
        logger.log('Enabled', 'SWAGGER');
        const config = new DocumentBuilder()
            .setTitle('Finlog BE')
            .setDescription('Finlog API description')
            .setVersion('1.0')
            .addGlobalResponse({ type: ResponseModel, description: 'Success', status: 200 })
            .addGlobalResponse({ type: ResponseModel, description: 'Unauthorized', status: 401 })
            .addGlobalResponse({
                type: ResponseModel,
                description: 'Internal server error',
                status: 500,
            })
            .addGlobalParameters({
                ...{ in: 'header', name: USER_ID_HEADER, description: 'User ID', required: true },
                schema: { type: 'string', default: '00000000-0000-0000-0000-000000000000' },
            })
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api', app, document);
    }

    const appConfig: AppConfig = configService.getOrThrow('app');
    await app.startAllMicroservices();
    await app.listen(appConfig.port);
}

bootstrap().then(() => {});
