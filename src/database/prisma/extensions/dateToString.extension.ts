import { Prisma } from '@src/database/main-db/generated/client';

export function dateToStringExtension() {
    function convertDatesToString(obj: any): any {
        if (obj instanceof Date) return obj.toISOString();
        if (Array.isArray(obj)) return obj.map(convertDatesToString);
        if (obj && typeof obj === 'object') {
            return Object.fromEntries(
                Object.keys(obj).map((key) => [key, convertDatesToString(obj[key])]),
            );
        }
        return obj;
    }
    return Prisma.defineExtension({
        name: 'date-to-string',
        query: {
            $allOperations: async ({ args, query }) => {
                const result = await query(args);
                return convertDatesToString(result);
            },
        },
    });
}
