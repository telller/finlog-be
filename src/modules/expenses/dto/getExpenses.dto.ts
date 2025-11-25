import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    ArrayUnique,
    IsArray,
    IsDateString,
    IsOptional,
    IsString,
    IsUUID,
    MinLength,
} from 'class-validator';
import { IsValidTagId } from '@src/common/decorators/entityIdValidation/isValidTagId.decorator';
import { IsInt32 } from '@src/common/decorators/isInt32.decorator';
import { Transform } from 'class-transformer';

export class GetExpensesForStatDto {
    @ApiProperty()
    @IsDateString()
    fromDateTime: string;

    @ApiProperty()
    @IsDateString()
    toDateTime: string;

    @ApiPropertyOptional({ type: String, isArray: true })
    @IsUUID(undefined, { each: true })
    @ArrayUnique((id: string) => id)
    @IsValidTagId({ each: true })
    @IsOptional()
    @IsArray()
    tagIds?: string[];

    @ApiPropertyOptional()
    @MinLength(3)
    @IsOptional()
    @IsString()
    search?: string;

    @Transform(({ value }) => Number(value))
    @ApiPropertyOptional()
    @IsOptional()
    @IsInt32()
    amountFrom?: number;

    @Transform(({ value }) => Number(value))
    @ApiPropertyOptional()
    @IsOptional()
    @IsInt32()
    amountTo?: number;
}
