import { Logger } from '@nestjs/common';
import { Prisma } from '@prisma';

export function loggerExtension(logger: Logger, dbName: string) {
    return Prisma.defineExtension({
        name: 'logger',
        query: {
            $allOperations: async ({ model, operation, args, query }) => {
                const start = Date.now();
                const res = await query(args);
                const message = `[${dbName}] Query ${model}.${operation} ${JSON.stringify(args)} took ${Date.now() - start}ms`;
                logger.log(message);
                return res;
            },
        },
    });
}
