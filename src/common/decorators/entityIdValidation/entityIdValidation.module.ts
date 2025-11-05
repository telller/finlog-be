import { Module } from '@nestjs/common';
import { DatabaseModule } from '@src/database/database.module';
import { IsValidTagIdConstraint } from './isValidTagId.decorator';

@Module({
    imports: [DatabaseModule],
    providers: [
        IsValidTagIdConstraint,
    ],
})
export class EntityIdValidationModule {}
