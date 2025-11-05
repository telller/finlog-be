import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class PaginationDto {
    @ApiProperty()
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(1)
    page: number;
}
