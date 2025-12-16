import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@src/database/main-db/generated/client';
import { PrismaPg } from '@prisma/adapter-pg';
import {
    updateSystemFieldsExtension,
    bigIntToStringExtension,
    dateToStringExtension,
    loggerExtension,
} from '@src/database/prisma/extensions';

@Injectable()
export class PrismaClientService extends PrismaClient implements OnModuleInit {
    constructor(private readonly logger: Logger) {
        const adapter = new PrismaPg({
            connectionString: process.env.PG_DATABASE_URL,
        });

        super({ adapter });

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
