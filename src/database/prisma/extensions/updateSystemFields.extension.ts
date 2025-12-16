import { map } from 'lodash';
import { UserIdModelContext } from '@src/shared/user/models/user.model';
import { Prisma } from '@src/database/main-db/generated/client';

export function updateSystemFieldsExtension() {
    return Prisma.defineExtension({
        name: 'update-system-fields',
        query: {
            $allModels: {
                async create({ args, query }) {
                    const { userId } = UserIdModelContext;
                    if (!userId) return query(args);
                    const data = { ...(args.data || {}), createdBy: userId, updatedBy: userId };
                    return query({ ...args, data } as typeof args);
                },
                async createMany({ args, query }) {
                    const { userId } = UserIdModelContext;
                    if (!userId) return query(args);
                    const data = map((args.data as Record<string, any>[]) || [], (item) => ({
                        ...item,
                        createdBy: userId,
                        updatedBy: userId,
                    }));
                    return query({ ...args, data } as typeof args);
                },
                async createManyAndReturn({ args, query }) {
                    const { userId } = UserIdModelContext;
                    if (!userId) return query(args);
                    const data = map((args.data as Record<string, any>[]) || [] || [], (item) => ({
                        ...item,
                        createdBy: userId,
                        updatedBy: userId,
                    }));
                    return query({ ...args, data } as typeof args);
                },
                async update({ args, query }) {
                    const { userId } = UserIdModelContext;
                    if (!userId) return query(args);
                    const data = { ...(args.data || {}), updatedBy: userId };
                    return query({ ...args, data } as typeof args);
                },
                async updateMany({ args, query }) {
                    const { userId } = UserIdModelContext;
                    if (!userId) return query(args);
                    const data = { ...(args.data || {}), updatedBy: userId };
                    return query({ ...args, data } as typeof args);
                },
                async upsert({ args, query }) {
                    const { userId } = UserIdModelContext;
                    if (!userId) return query(args);
                    const updatedArgs = {
                        ...args,
                        create: { ...(args.create || {}), createdBy: userId, updatedBy: userId },
                        update: { ...(args.update || {}), updatedBy: userId },
                    } as typeof args;
                    return query(updatedArgs);
                },
            },
        },
    });
}
