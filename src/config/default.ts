import * as process from 'process';
import { Environment } from '@src/config/constants/env.enum';

export const config = {
    app: {
        serviceIdentifier: process.env.SERVICE_IDENTIFIER || 'finlog-be',
        env: process.env.NODE_ENV || Environment.DEVELOPMENT,
        logLevel: process.env.LOG_LEVEL || 'debug',
        swagger: process.env.SWAGGER || 'on',
        port: process.env.PORT || 3000,
    },
    auth: {
        jwtSecret: process.env.JWT_SECRET,
    },
};
