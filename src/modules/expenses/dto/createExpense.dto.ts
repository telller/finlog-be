import { IsDateString, IsString, IsUUID, MaxLength, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt32 } from '@src/common/decorators/isInt32.decorator';
import { IsValidTagId } from '@src/common/decorators/entityIdValidation/isValidTagId.decorator';

export class CreateExpenseDto {
    @ApiProperty()
    @IsDateString()
    spendAt: string;

    @ApiProperty()
    @IsString()
    @MaxLength(50)
    @MinLength(3)
    description: string;

    @ApiProperty()
    @IsUUID()
    @IsValidTagId()
    tagId: string;

    @ApiProperty()
    @IsInt32()
    @Min(1)
    amount: number;
}
