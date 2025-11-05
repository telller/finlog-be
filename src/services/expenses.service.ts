import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from '@src/modules/expenses/dto/createExpense.dto';
import { GetExpensesDto } from '@src/modules/expenses/dto/getExpenses.dto';
import { ExpensesDbRepository } from '@src/database/repository';

@Injectable()
export class ExpensesService {
    constructor(private readonly expensesDbRepository: ExpensesDbRepository) {}

    async getExpenses(data: GetExpensesDto) {
        return this.expensesDbRepository.getExpenses(data);
    }

    async createExpense(data: CreateExpenseDto) {
        return this.expensesDbRepository.createExpense(data);
    }

    async deleteExpense(id: string) {
        return this.expensesDbRepository.deleteExpense(id);
    }
}
