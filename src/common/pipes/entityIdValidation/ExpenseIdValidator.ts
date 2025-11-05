import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { ExpensesDbRepository } from '@src/database/repository';
import { Messages } from '@src/common/constants/messages';

@Injectable()
export class ExpenseIdValidator implements PipeTransform {
    constructor(private readonly expensesDbRepository: ExpensesDbRepository) {}

    async transform(tagId: string): Promise<string> {
        const res = await this.expensesDbRepository.getExpenseById(tagId);
        if (!res) throw new NotFoundException(Messages.EntityWithIdDoesntExists);
        return tagId;
    }
}
