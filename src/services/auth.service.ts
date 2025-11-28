import { Injectable } from '@nestjs/common';
import { UpsertTagDto } from '@src/modules/tag/dto/upsertTag.dto';
import { UserDbRepository } from '@src/database/repository/user.db.repository';

@Injectable()
export class AuthService {
    constructor(private readonly userDbRepository: UserDbRepository) {}

    async getMe() {
        // return this.tagDbRepository.getAllTags();
    }

    async login() {
        // return this.tagDbRepository.getAllTags();
    }

    async refreshToken(data: UpsertTagDto) {
        // return this.tagDbRepository.createTag(data);
    }
}
