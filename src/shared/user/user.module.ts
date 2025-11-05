import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserIdMiddleware } from '@src/shared/user/middlewares/user.middleware';

@Module({
    providers: [UserIdMiddleware],
    exports: [UserIdMiddleware],
})
export class UserIdModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(UserIdMiddleware).forRoutes('*');
    }
}
