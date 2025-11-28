import { AsyncLocalStorage } from 'async_hooks';

export class UserIdModelContext<TRequest = any, TResponse = any> {
    static cls = new AsyncLocalStorage<UserIdModelContext>();

    static get userId(): string | null {
        return this.cls?.getStore()?.req?.get('userId') || null;
    }

    constructor(
        public readonly req: TRequest,
        public readonly res: TResponse,
    ) {}
}
