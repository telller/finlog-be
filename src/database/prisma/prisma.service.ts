import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { readReplicas } from '@prisma/extension-read-replicas';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma';
import { updateSystemFieldsExtension, loggerExtension } from '@src/database/prisma/extensions';

@Injectable()
export class PrismaClientService extends PrismaClient implements OnModuleInit {
    private readonly replica?: any;

    constructor(
        private readonly configService: ConfigService,
        private readonly logger: Logger,
    ) {
        const databaseUrl = configService.getOrThrow<string>('databaseUrl');
        const adapter = new PrismaPg({ connectionString: databaseUrl });
        super({ adapter });

        const replicaUrl = configService.get<string>('readDatabaseUrl');
        let client: any = this;
        if (replicaUrl) {
            const replicaAdapter = new PrismaPg({ connectionString: replicaUrl });
            this.replica = new PrismaClient({ adapter: replicaAdapter }).$extends(
                loggerExtension(this.logger, 'Replica'),
            );
            client = client.$extends(readReplicas({ replicas: [this.replica] }));
        }

        client = client
            .$extends(updateSystemFieldsExtension())
            .$extends(loggerExtension(this.logger, 'Main'));

        Object.assign(this, client);
    }

    async onModuleInit() {
        await this.$connect();
    }
}
