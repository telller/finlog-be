import { AsyncLocalStorage } from 'async_hooks';
import { USER_ID_HEADER } from '@src/shared/user/constants/user.constant';

export class UserIdModelContext<TRequest = any, TResponse = any> {
    static cls = new AsyncLocalStorage<UserIdModelContext>();

    static get userId(): string | null {
        return this.cls?.getStore()?.req?.get(USER_ID_HEADER) || null;
    }

    constructor(
        public readonly req: TRequest,
        public readonly res: TResponse,
    ) {}
}
