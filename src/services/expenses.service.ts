import { Injectable } from '@nestjs/common';
import { UpsertExpense } from '@src/modules/expenses/dto/upsertExpense';
import { GetExpensesDto } from '@src/modules/expenses/dto/getExpenses.dto';
import { ExpensesDbRepository } from '@src/database/repository';

@Injectable()
export class ExpensesService {
    constructor(private readonly expensesDbRepository: ExpensesDbRepository) {}

    async getExpenses(data: GetExpensesDto) {
        return this.expensesDbRepository.getExpenses(data);
    }

    async createExpense(data: UpsertExpense) {
        return this.expensesDbRepository.createExpense(data);
    }

    async updateExpense(id: string, data: UpsertExpense) {
        return this.expensesDbRepository.updateExpense(id, data);
    }

    async deleteExpense(id: string) {
        return this.expensesDbRepository.deleteExpense(id);
    }
}
