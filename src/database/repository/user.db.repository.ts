import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '@src/database/prisma/prisma.service';

@Injectable()
export class UserDbRepository {
    constructor(private readonly prisma: PrismaClientService) {}

    async getAllTags() {
        return this.prisma.tag.findMany({ orderBy: { order: 'asc' } });
    }

    async getTagById(id: string) {
        return this.prisma.tag.findFirst({ where: { id } });
    }
}
