import { Logger, Module } from '@nestjs/common';
import { ExpensesDbRepository, StatDbRepository, TagDbRepository } from '@src/database/repository';
import { UserDbRepository } from '@src/database/repository/user.db.repository';
import { PrismaClientService } from '@src/database/prisma/prisma.service';

@Module({
    providers: [
        Logger,
        PrismaClientService,
        ExpensesDbRepository,
        UserDbRepository,
        StatDbRepository,
        TagDbRepository,
    ],
    exports: [UserDbRepository, ExpensesDbRepository, StatDbRepository, TagDbRepository],
})
export class DatabaseModule {}
