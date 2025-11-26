import { Logger, Module } from '@nestjs/common';
import { ExpensesDbRepository, StatDbRepository, TagDbRepository } from '@src/database/repository';
import { PrismaClientService } from '@src/database/prisma/prisma.service';

@Module({
    providers: [
        Logger,
        PrismaClientService,
        ExpensesDbRepository,
        StatDbRepository,
        TagDbRepository,
    ],
    exports: [ExpensesDbRepository, StatDbRepository, TagDbRepository],
})
export class DatabaseModule {}
