import { Injectable } from '@nestjs/common';
import { GetExpensesDto } from '@src/modules/expenses/dto/getExpenses.dto';
import { PrismaClientService } from '@src/database/prisma/prisma.service';
import { UpsertExpense } from '@src/modules/expenses/dto/upsertExpense';
import { DEFAULT_PAGE_SIZE } from '@src/common/constants/pagination';

@Injectable()
export class ExpensesDbRepository {
    constructor(private readonly prisma: PrismaClientService) {}

    async getExpenses({ page, fromDateTime, toDateTime }: GetExpensesDto) {
        const where = { spendAt: { gte: fromDateTime, lte: toDateTime } };
        const total = await this.prisma.expenses.count({ where });
        const items = await this.prisma.expenses.findMany({
            where,
            orderBy: [{ spendAt: 'desc' }, { updatedAt: 'desc' }],
            skip: (page - 1) * DEFAULT_PAGE_SIZE,
            take: DEFAULT_PAGE_SIZE,
        });
        return { items, total };
    }

    async getExpenseById(id: string) {
        return this.prisma.expenses.findFirst({ where: { id } });
    }

    async createExpense({ spendAt, description, tagId, amount }: UpsertExpense) {
        return this.prisma.expenses.create({ data: { spendAt, description, tagId, amount } });
    }

    async updateExpense(id: string, { spendAt, description, tagId, amount }: UpsertExpense) {
        return this.prisma.expenses.update({
            where: { id },
            data: { spendAt, description, tagId, amount },
        });
    }

    async deleteExpense(id: string) {
        return this.prisma.expenses.delete({ where: { id } });
    }
}
