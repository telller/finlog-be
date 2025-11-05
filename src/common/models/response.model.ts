import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ResponseModel {
    @ApiProperty()
    success: boolean;

    @ApiProperty()
    message: string;

    @ApiProperty()
    error: object | null;

    @ApiPropertyOptional()
    @IsOptional()
    data?: object | null;
}
