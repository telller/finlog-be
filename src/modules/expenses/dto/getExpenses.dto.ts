import { IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '@src/common/dto/pagination.dto';

export class GetExpensesDto extends PaginationDto {
    @ApiProperty()
    @IsDateString()
    fromDateTime: string;

    @ApiProperty()
    @IsDateString()
    toDateTime: string;
}
