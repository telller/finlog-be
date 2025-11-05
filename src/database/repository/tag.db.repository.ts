import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '@src/database/prisma/prisma.service';
import { TagOrderItemDto } from '@src/modules/tag/dto/tagOrderItem.dto';
import { UpsertTagDto } from '@src/modules/tag/dto/upsertTag.dto';

@Injectable()
export class TagDbRepository {
    constructor(private readonly prisma: PrismaClientService) {}

    async getAllTags() {
        return this.prisma.tag.findMany({
            orderBy: { order: 'asc' },
        });
    }

    async getTagById(id: string) {
        return this.prisma.tag.findFirst({ where: { id } });
    }

    async createTag({ name, order }: UpsertTagDto) {
        return this.prisma.tag.create({ data: { name, order } });
    }

    async updateTagsOrder(data: TagOrderItemDto[]) {
        await this.prisma.$transaction(
            data.map(({ id, order }) => this.prisma.tag.update({ where: { id }, data: { order } })),
        );
    }

    async updateTag(id: string, { name, order }: UpsertTagDto) {
        return this.prisma.tag.update({ where: { id }, data: { name, order } });
    }

    async deleteTag(id: string) {
        return this.prisma.tag.delete({ where: { id } });
    }
}
