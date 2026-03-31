import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '@src/database/prisma/prisma.service';

@Injectable()
export class UserDbRepository {
    constructor(private readonly prisma: PrismaClientService) {}

    async getUserById(id: string) {
        return this.prisma.user.findFirst({ where: { id }, omit: { password: true } });
    }

    async getUserByEmail(email: string) {
        return this.prisma.user.findFirst({ where: { email } });
    }
}
