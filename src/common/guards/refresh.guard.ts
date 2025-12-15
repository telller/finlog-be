import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '@src/services/auth.service';

@Injectable()
export class RefreshGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly logger: Logger,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { refreshToken } = request.body;
        if (!refreshToken) {
            this.logger.error('AuthGuard Error: Unauthorized access, refreshToken not found');
            throw new UnauthorizedException('Unauthorized access, refreshToken not found');
        }
        try {
            const { sub } = await this.authService.validateToken(refreshToken);
            request.userId = sub;
        } catch {
            this.logger.error('AuthGuard Error: Unauthorized access, refreshToken is not valid');
            throw new UnauthorizedException('Unauthorized access, refreshToken is not valid');
        }
        return true;
    }
}
