import { Injectable } from '@nestjs/common';
import { UpsertExpense } from '@src/modules/expenses/dto/upsertExpense';
import { ExpensesDbRepository } from '@src/database/repository';
import { PaginationDto } from '@src/common/dto/pagination.dto';

@Injectable()
export class ExpensesService {
    constructor(private readonly expensesDbRepository: ExpensesDbRepository) {}

    async getExpenses(data: PaginationDto) {
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
