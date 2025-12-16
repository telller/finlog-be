import { Prisma } from '@src/database/main-db/generated/client';

export function bigIntToStringExtension() {
    function convertDecimalToNumber(obj: any): any {
        if (typeof obj === 'bigint') return obj.toString();
        if (Array.isArray(obj)) return obj.map(convertDecimalToNumber);
        if (obj && typeof obj === 'object') {
            return Object.fromEntries(
                Object.keys(obj).map((key) => [key, convertDecimalToNumber(obj[key])]),
            );
        }
        return obj;
    }
    return Prisma.defineExtension({
        name: 'decimal-to-number',
        query: {
            $allOperations: async ({ args, query }) => {
                const result = await query(args);
                return convertDecimalToNumber(result);
            },
        },
    });
}
