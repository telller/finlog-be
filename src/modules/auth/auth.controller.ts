import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { getSuccessResponse } from '@src/common/utils/getResponse';
import { UserId } from '@src/common/decorators/userId.decorator';
import { RefreshGuard } from '@src/common/guards/refresh.guard';
import { RefreshDto } from '@src/modules/auth/dto/refresh.dto';
import { AuthGuard } from '@src/common/guards/auth.guard';
import { Messages } from '@src/common/constants/messages';
import { AuthService } from '@src/services/auth.service';
import { LoginDto } from '@src/modules/auth/dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard)
    @ApiBearerAuth('jwt')
    @Get('/me')
    async getMe(@UserId() userId: string) {
        const res = await this.authService.getMe(userId);
        return getSuccessResponse(Messages.GeneralSuccess, res);
    }

    @Post('/login')
    async login(@Body() data: LoginDto) {
        const res = await this.authService.login(data);
        return getSuccessResponse(Messages.GeneralSuccess, res);
    }

    @UseGuards(RefreshGuard)
    @Post('/refresh-token')
    async refreshToken(@Body() _: RefreshDto, @UserId() userId: string) {
        const res = await this.authService.refreshToken(userId);
        return getSuccessResponse(Messages.GeneralSuccess, res);
    }
}
