import { Logger, Module } from '@nestjs/common';
import { EntityIdValidationModule } from '@src/common/decorators/entityIdValidation/entityIdValidation.module';
import { ExpensesService } from '@src/services/expenses.service';
import { DatabaseModule } from '@src/database/database.module';
import { StatService } from '@src/services/stat.service';
import { TagService } from '@src/services/tag.service';

@Module({
    imports: [EntityIdValidationModule, DatabaseModule],
    providers: [Logger, ExpensesService, StatService, TagService],
    exports: [Logger, DatabaseModule, ExpensesService, StatService, TagService],
})
export class ServicesModule {}
