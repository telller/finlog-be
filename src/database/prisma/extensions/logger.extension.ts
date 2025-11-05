import { Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export function loggerExtension(logger: Logger) {
    return Prisma.defineExtension({
        name: 'logger',
        query: {
            $allOperations: async ({ model, operation, args, query }) => {
                const start = Date.now();
                const result = await query(args);
                const message = `Query ${model}.${operation} ${JSON.stringify(args)} took ${Date.now() - start}ms`;
                logger.log(message);
                return result;
            },
        },
    });
}
