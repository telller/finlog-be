import { BadRequestException, Injectable } from '@nestjs/common';
import { UpsertExpense } from '@src/modules/expenses/dto/upsertExpense';
import { ExpensesDbRepository, TagDbRepository } from '@src/database/repository';
import { PaginationDto } from '@src/common/dto/pagination.dto';
import * as xlsx from 'xlsx';
import { flatten, map, some } from 'lodash';

@Injectable()
export class ExpensesService {
    constructor(
        private readonly expensesDbRepository: ExpensesDbRepository,
        private readonly tagDbRepository: TagDbRepository,
    ) {}

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

    async importFromXlsx(file: Express.Multer.File) {
        const tags = await this.tagDbRepository.getAllTags();
        const tagsMap = new Map(tags.map((tag) => [tag.name, tag.id]));
        try {
            const workbook = xlsx.read(file.buffer, { type: 'buffer' });
            const allSheetsData = workbook.SheetNames.map((sheetName) => {
                const sheet = workbook.Sheets[sheetName];
                return xlsx.utils.sheet_to_json<{
                    Номер: string;
                    Дата: number;
                    Назва: string;
                    Тип: string;
                    'Сума (грн)': string;
                }>(sheet, {
                    raw: false,
                    dateNF: 'dd.mm.yyyy',
                });
            });
            const allRows = flatten(allSheetsData);
            const validDataRows = map(allRows, (row) => ({
                spendAt: new Date((row['Дата'] - 25569) * 86400 * 1000).toISOString(),
                amount: +row['Сума (грн)'],
                description: row['Назва'],
                tagId: tagsMap.get(row['Тип'])!,
            }));
            if (
                some(
                    validDataRows,
                    (row) => !row.spendAt || !row.amount || !row.tagId || !row.description,
                )
            ) {
                throw new BadRequestException('Invalid file');
            }
            console.log(validDataRows);
            await this.expensesDbRepository.createExpensesMany(validDataRows);
        } catch (error) {
            console.log(error);
        }
    }
}
