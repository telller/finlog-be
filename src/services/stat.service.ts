import { Injectable } from '@nestjs/common';
import { GetExpensesStatListDto } from '@src/modules/stat/dto/getExpensesStatList.dto';
import { ExpensesStatFilterDto } from '@src/modules/stat/dto/expensesStatFilter.dto';
import { StatDbRepository } from '@src/database/repository';

@Injectable()
export class StatService {
    constructor(private readonly statDbRepository: StatDbRepository) {}

    async getTagsStat(data: ExpensesStatFilterDto) {
        return this.statDbRepository.getTagsStat(data);
    }

    async getExpensesStatList(data: GetExpensesStatListDto) {
        return this.statDbRepository.getExpensesStatList(data);
    }
}
