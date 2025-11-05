import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { TagDbRepository } from '@src/database/repository';
import { Messages } from '@src/common/constants/messages';

@Injectable()
export class TagIdValidator implements PipeTransform {
    constructor(private readonly tagDbRepository: TagDbRepository) {}

    async transform(tagId: string): Promise<string> {
        const res = await this.tagDbRepository.getTagById(tagId);
        if (!res) throw new NotFoundException(Messages.EntityWithIdDoesntExists);
        return tagId;
    }
}
