import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '@src/database/prisma/prisma.service';

@Injectable()
export class UserDbRepository {
    constructor(private readonly prisma: PrismaClientService) {}

    async getUserByEmail(email: string) {
        // console.log({ password: await bcrypt.hash(password, 10) }); // for user creation
        return this.prisma.user.findFirst({ where: { email } });
    }

    async getTagById(id: string) {
        return this.prisma.tag.findFirst({ where: { id } });
    }
}
