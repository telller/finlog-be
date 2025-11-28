import { BadRequestException, Injectable } from '@nestjs/common';
import { UpsertTagDto } from '@src/modules/tag/dto/upsertTag.dto';
import { UserDbRepository } from '@src/database/repository/user.db.repository';
import { LoginDto } from '@src/modules/auth/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthConfig } from '@src/config/interfaces/config.interface';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    private readonly jwtSecret: string;

    constructor(
        private readonly userDbRepository: UserDbRepository,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) {
        const { jwtSecret } = this.configService.getOrThrow<AuthConfig>('auth');
        this.jwtSecret = jwtSecret || '';
    }

    async getMe() {
        // return this.tagDbRepository.getAllTags();
    }

    async login({ email, password }: LoginDto) {
        const user = await this.userDbRepository.getUserByEmail(email);
        if (!user) throw new BadRequestException('Invalid credentials');
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new BadRequestException('Invalid credentials');
        return this.generateTokens(user.id);
    }

    async refreshToken(data: UpsertTagDto) {
        // return this.generateTokens();
    }

    async validateToken(token: string) {
        return this.jwtService.verifyAsync(token, {
            secret: this.configService.getOrThrow<AuthConfig>('auth').jwtSecret,
        });
    }

    private async generateTokens(userId: string) {
        const accessToken = await this.jwtService.signAsync(
            { sub: userId },
            { secret: process.env.JWT_ACCESS_SECRET, expiresIn: '15m' },
        );
        const refreshToken = await this.jwtService.signAsync(
            { sub: userId },
            { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' },
        );
        return { accessToken, refreshToken };
    }
}
