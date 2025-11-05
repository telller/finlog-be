import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserIdModelContext } from '@src/shared/user/models/user.model';

@Injectable()
export class UserIdMiddleware implements NestMiddleware<Request, Response> {
    use(req: Request, res: Response, next: () => void): void {
        UserIdModelContext.cls.run(new UserIdModelContext(req, res), next);
    }
}
