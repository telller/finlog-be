import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserInterface } from '@src/common/interfaces/user.interface';

export const UserId = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
    const request: UserInterface = ctx.switchToHttp().getRequest();
    return request.userId;
});
