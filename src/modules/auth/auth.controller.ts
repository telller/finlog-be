import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { getSuccessResponse } from '@src/common/utils/getResponse';
import { UpsertTagDto } from '@src/modules/tag/dto/upsertTag.dto';
import { Messages } from '@src/common/constants/messages';
import { AuthService } from '@src/services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get('/me')
    async getMe() {
        const res = await this.authService.getMe();
        return getSuccessResponse(Messages.GeneralSuccess, res);
    }

    @Post('/login')
    async getAllTags() {
        const res = await this.authService.login();
        return getSuccessResponse(Messages.GeneralSuccess, res);
    }

    @Post('/refresh-token')
    async createTag(@Body() data: UpsertTagDto) {
        const res = await this.authService.refreshToken(data);
        return getSuccessResponse(Messages.GeneralSuccess, res);
    }
}
