import { Logger, Module } from '@nestjs/common';
import { ExpensesDbRepository, TagDbRepository } from '@src/database/repository';
import { PrismaClientService } from '@src/database/prisma/prisma.service';

@Module({
    providers: [Logger, PrismaClientService, ExpensesDbRepository, TagDbRepository],
    exports: [ExpensesDbRepository, TagDbRepository],
})
export class DatabaseModule {}
