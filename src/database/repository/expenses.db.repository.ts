import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '@src/database/prisma/prisma.service';
import { UpsertExpense } from '@src/modules/expenses/dto/upsertExpense';
import { DEFAULT_PAGE_SIZE } from '@src/common/constants/pagination';
import { PaginationDto } from '@src/common/dto/pagination.dto';

@Injectable()
export class ExpensesDbRepository {
    constructor(private readonly prisma: PrismaClientService) {}

    async getExpenses({ page }: PaginationDto) {
        const total = await this.prisma.expenses.count({});
        const items = await this.prisma.expenses.findMany({
            orderBy: [{ spendAt: 'desc' }, { createdAt: 'desc' }],
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

    async createExpensesMany(data: UpsertExpense[]) {
        return this.prisma.expenses.createMany({ data });
    }
}
