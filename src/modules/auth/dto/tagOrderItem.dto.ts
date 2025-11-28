import { IsNumber, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsValidTagId } from '@src/common/decorators/entityIdValidation/isValidTagId.decorator';
import { IsInt32 } from '@src/common/decorators/isInt32.decorator';

export class TagOrderItemDto {
    @ApiProperty()
    @IsUUID()
    @IsValidTagId()
    id: string;

    @ApiProperty()
    @IsNumber()
    @IsInt32()
    order: number;
}
