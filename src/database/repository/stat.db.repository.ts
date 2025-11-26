import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { map, reduce } from 'lodash';
import { GetExpensesStatListDto } from '@src/modules/stat/dto/getExpensesStatList.dto';
import { ExpensesStatFilterDto } from '@src/modules/stat/dto/expensesStatFilter.dto';
import { PrismaClientService } from '@src/database/prisma/prisma.service';
import { DEFAULT_PAGE_SIZE } from '@src/common/constants/pagination';

@Injectable()
export class StatDbRepository {
    constructor(private readonly prisma: PrismaClientService) {}

    async getTagsStat(data: ExpensesStatFilterDto) {
        const res = await this.prisma.expenses.groupBy({
            where: this.getStatFilter(data),
            by: ['tagId'],
            _sum: { amount: true },
        });
        const total = reduce(res, (acc, { _sum }) => acc + (_sum.amount ?? 0), 0);
        return map(res, ({ tagId, _sum: { amount } }) => {
            const percent = total ? ((amount || 0) / total) * 100 : 0;
            return { tagId, amount, percent: Number(percent.toFixed(2)) };
        });
    }

    async getExpensesStatList(data: GetExpensesStatListDto) {
        return this.prisma.expenses.findMany({
            where: this.getStatFilter(data),
            orderBy: [{ spendAt: 'desc' }, { createdAt: 'desc' }],
            skip: (data.page - 1) * DEFAULT_PAGE_SIZE,
            take: DEFAULT_PAGE_SIZE,
        });
    }

    private getStatFilter(data: ExpensesStatFilterDto) {
        const { fromDateTime, toDateTime, tagIds, search, amountFrom, amountTo } = data;
        const tagsFilter = (tagIds || []).length ? { tagId: { in: tagIds } } : {};
        const searchFilter = search
            ? { description: { contains: search, mode: Prisma.QueryMode.insensitive } }
            : {};
        const amountFromFilter =
            typeof amountFrom === 'number' ? { amount: { gte: amountFrom } } : {};
        const amountToFilter = typeof amountTo === 'number' ? { amount: { lte: amountTo } } : {};
        return {
            spendAt: { gte: fromDateTime, lte: toDateTime },
            ...tagsFilter,
            ...searchFilter,
            ...amountFromFilter,
            ...amountToFilter,
        };
    }
}
