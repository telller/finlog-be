import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '@src/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly logger: Logger,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        this.logger.log('Auth Guard logs:', request.headers);
        if (!token) {
            this.logger.error('AuthGuard Error: Unauthorized access, token not found');
            throw new UnauthorizedException('Unauthorized access, token not found');
        }
        try {
            const { sub } = await this.authService.validateToken(token);
            request.userId = sub;
        } catch {
            this.logger.error('AuthGuard Error: Unauthorized access, token is not valid');
            throw new UnauthorizedException('Unauthorized access, token is not valid');
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
