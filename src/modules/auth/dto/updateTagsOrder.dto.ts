import { ArrayUnique, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { TagOrderItemDto } from '@src/modules/tag/dto/tagOrderItem.dto';

export class UpdateTagsOrderDto {
    @ApiProperty({ type: TagOrderItemDto, isArray: true })
    @ArrayUnique((t: TagOrderItemDto) => t.order)
    @ArrayUnique((t: TagOrderItemDto) => t.id)
    @ValidateNested({ each: true })
    @Type(() => TagOrderItemDto)
    @IsArray()
    tags: TagOrderItemDto[];
}
