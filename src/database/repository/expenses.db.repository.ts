import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from '@src/modules/expenses/dto/createExpense.dto';
import { PrismaClientService } from '@src/database/prisma/prisma.service';
import { GetExpensesDto } from '@src/modules/expenses/dto/getExpenses.dto';
import { DEFAULT_PAGE_SIZE } from '@src/common/constants/pagination';

@Injectable()
export class ExpensesDbRepository {
    constructor(private readonly prisma: PrismaClientService) {}

    async getExpenses({ page, fromDateTime, toDateTime }: GetExpensesDto) {
        return this.prisma.expenses.findMany({
            where: { spendAt: { gte: fromDateTime, lte: toDateTime } },
            orderBy: { spendAt: 'desc' },
            skip: (page - 1) * DEFAULT_PAGE_SIZE,
            take: DEFAULT_PAGE_SIZE,
        });
    }

    async getExpenseById(id: string) {
        return this.prisma.expenses.findFirst({ where: { id } });
    }

    async createExpense({ spendAt, description, tagId, amount }: CreateExpenseDto) {
        return this.prisma.expenses.create({ data: { spendAt, description, tagId, amount } });
    }

    async deleteExpense(id: string) {
        return this.prisma.expenses.delete({ where: { id } });
    }
}
