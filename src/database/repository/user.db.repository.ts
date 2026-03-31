import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '@src/database/prisma/prisma.service';

@Injectable()
export class UserDbRepository {
    constructor(private readonly prisma: PrismaClientService) {}

    async createUser(email: string, password: string) {
        return this.prisma.user.create({ data: { username: 'teller', email, password } });
    }

    async getUserById(id: string) {
        return this.prisma.user.findFirst({ where: { id }, omit: { password: true } });
    }

    async getUserByEmail(email: string) {
        return this.prisma.user.findFirst({ where: { email } });
    }
}
