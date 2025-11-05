import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
    updateSystemFieldsExtension,
    bigIntToStringExtension,
    dateToStringExtension,
    loggerExtension,
} from '@src/database/prisma/extensions';

@Injectable()
export class PrismaClientService extends PrismaClient implements OnModuleInit {
    constructor(
        private readonly logger: Logger,
    ) {
        super();

        const main = this.$extends(updateSystemFieldsExtension())
            .$extends(bigIntToStringExtension())
            .$extends(dateToStringExtension())
            .$extends(loggerExtension(this.logger)) as PrismaClient;

        Object.assign(this, main);
    }

    async onModuleInit() {
        await this.$connect();
    }
}
