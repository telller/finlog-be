import { Logger, Module } from '@nestjs/common';
import { EntityIdValidationModule } from '@src/common/decorators/entityIdValidation/entityIdValidation.module';
import { DatabaseModule } from '@src/database/database.module';
import { TagService } from '@src/services/tag.service';

@Module({
    imports: [EntityIdValidationModule, DatabaseModule],
    providers: [
        Logger,

        TagService,
    ],
    exports: [
        Logger,
        DatabaseModule,
        TagService,
    ],
})
export class ServicesModule {}
