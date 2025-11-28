import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt32 } from '@src/common/decorators/isInt32.decorator';

export class UpsertTagDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(15)
    @MinLength(3)
    name: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsInt32()
    order: number;
}
