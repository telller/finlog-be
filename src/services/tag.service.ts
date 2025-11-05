import { Injectable } from '@nestjs/common';
import { TagOrderItemDto } from '@src/modules/tag/dto/tagOrderItem.dto';
import { UpsertTagDto } from '@src/modules/tag/dto/upsertTag.dto';
import { TagDbRepository } from '@src/database/repository';

@Injectable()
export class TagService {
    constructor(private readonly tagDbRepository: TagDbRepository) {}

    async getAllTags() {
        return this.tagDbRepository.getAllTags();
    }

    async createTag(data: UpsertTagDto) {
        return this.tagDbRepository.createTag(data);
    }

    async updateTagsOrder(data: TagOrderItemDto[]) {
        return this.tagDbRepository.updateTagsOrder(data);
    }

    async updateTag(id: string, data: UpsertTagDto) {
        return this.tagDbRepository.updateTag(id, data);
    }

    async deleteTag(id: string) {
        return this.tagDbRepository.deleteTag(id);
    }
}
