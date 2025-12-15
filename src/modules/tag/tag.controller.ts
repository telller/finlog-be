import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { TagIdValidator } from '@src/common/pipes/entityIdValidation/TagIdValidator';
import { UpdateTagsOrderDto } from '@src/modules/tag/dto/updateTagsOrder.dto';
import { getSuccessResponse } from '@src/common/utils/getResponse';
import { UpsertTagDto } from '@src/modules/tag/dto/upsertTag.dto';
import { Messages } from '@src/common/constants/messages';
import { AuthGuard } from '@src/common/guards/auth.guard';
import { TagService } from '@src/services/tag.service';

@ApiTags('Tag')
@Controller('tag')
@ApiBearerAuth('jwt')
@UseGuards(AuthGuard)
export class TagController {
    constructor(private tagService: TagService) {}

    @Get('/list')
    async getAllTags() {
        const res = await this.tagService.getAllTags();
        return getSuccessResponse(Messages.GeneralSuccess, res);
    }

    @Post('/')
    async createTag(@Body() data: UpsertTagDto) {
        const res = await this.tagService.createTag(data);
        return getSuccessResponse(Messages.GeneralSuccess, res);
    }

    @Put('/order')
    async updateTagsOrder(@Body() { tags }: UpdateTagsOrderDto) {
        await this.tagService.updateTagsOrder(tags);
        return getSuccessResponse(Messages.GeneralSuccess);
    }

    @Put('/:id')
    async updateTag(
        @Param('id', ParseUUIDPipe, TagIdValidator) id: string,
        @Body() data: UpsertTagDto,
    ) {
        const res = await this.tagService.updateTag(id, data);
        return getSuccessResponse(Messages.GeneralSuccess, res);
    }

    @Delete('/:id')
    async deleteTag(@Param('id', ParseUUIDPipe, TagIdValidator) id: string) {
        const res = await this.tagService.deleteTag(id);
        return getSuccessResponse(Messages.GeneralSuccess, res);
    }
}
