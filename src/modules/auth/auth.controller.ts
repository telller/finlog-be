import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { getSuccessResponse } from '@src/common/utils/getResponse';
import { UpsertTagDto } from '@src/modules/tag/dto/upsertTag.dto';
import { AuthGuard } from '@src/common/guards/auth.guard';
import { Messages } from '@src/common/constants/messages';
import { AuthService } from '@src/services/auth.service';
import { LoginDto } from '@src/modules/auth/dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard)
    @Get('/me')
    async getMe() {
        const res = await this.authService.getMe();
        return getSuccessResponse(Messages.GeneralSuccess, res);
    }

    @Post('/login')
    async login(@Body() data: LoginDto) {
        const res = await this.authService.login(data);
        return getSuccessResponse(Messages.GeneralSuccess, res);
    }

    @Post('/refresh-token')
    async createTag(@Body() data: UpsertTagDto) {
        const res = await this.authService.refreshToken(data);
        return getSuccessResponse(Messages.GeneralSuccess, res);
    }
}
