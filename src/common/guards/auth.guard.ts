import {Request} from 'express';
import {CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException,} from '@nestjs/common';
import {USER_ID_HEADER} from '@src/shared/user/constants/user.constant';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly logger: Logger) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        request.userId = this.extractUserIdFromHeader(request);
        return true;
    }

    private extractUserIdFromHeader(request: Request): string {
        const userId = request.headers[USER_ID_HEADER];
        if (!userId) {
            this.logger.error('AuthGuard Error: Unauthorized access, userId not found');
            throw new UnauthorizedException('Unauthorized access, userId not found');
        }
        return userId as string;
    }
}
