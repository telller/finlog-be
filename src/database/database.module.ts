import { Logger, Module } from '@nestjs/common';
import {
    TagDbRepository,
} from '@src/database/repository';
import { PrismaClientService } from '@src/database/prisma/prisma.service';

@Module({
    providers: [
        Logger,
        PrismaClientService,
        TagDbRepository,
    ],
    exports: [
        TagDbRepository,
    ],
})
export class DatabaseModule {}
