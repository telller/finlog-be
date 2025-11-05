import { Logger, Module } from '@nestjs/common';
import { EntityIdValidationModule } from '@src/common/decorators/entityIdValidation/entityIdValidation.module';
import { ExpensesService } from '@src/services/expenses.service';
import { DatabaseModule } from '@src/database/database.module';
import { TagService } from '@src/services/tag.service';

@Module({
    imports: [EntityIdValidationModule, DatabaseModule],
    providers: [Logger, ExpensesService, TagService],
    exports: [Logger, DatabaseModule, ExpensesService, TagService],
})
export class ServicesModule {}
