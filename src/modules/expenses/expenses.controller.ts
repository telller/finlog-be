import { ApiTags } from '@nestjs/swagger';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ExpenseIdValidator } from '@src/common/pipes/entityIdValidation/ExpenseIdValidator';
import { GetExpensesForStatDto } from '@src/modules/expenses/dto/getExpenses.dto';
import { UpsertExpense } from '@src/modules/expenses/dto/upsertExpense';
import { getSuccessResponse } from '@src/common/utils/getResponse';
import { ExpensesService } from '@src/services/expenses.service';
import { PaginationDto } from '@src/common/dto/pagination.dto';
import { Messages } from '@src/common/constants/messages';
import { AuthGuard } from '@src/common/guards/auth.guard';

@ApiTags('Expenses')
@Controller('expenses')
@UseGuards(AuthGuard)
export class ExpensesController {
    constructor(private expensesService: ExpensesService) {}

    @Get('/list')
    async getExpensesList(@Query() data: PaginationDto) {
        const res = await this.expensesService.getExpenses(data);
        return getSuccessResponse(Messages.GeneralSuccess, res);
    }

    @Get('/stat-list')
    async getExpensesStatList(@Query() data: GetExpensesForStatDto) {
        const res = await this.expensesService.getExpensesStatList(data);
        return getSuccessResponse(Messages.GeneralSuccess, res);
    }

    @Post('/')
    async createExpense(@Body() data: UpsertExpense) {
        const res = await this.expensesService.createExpense(data);
        return getSuccessResponse(Messages.GeneralSuccess, res);
    }

    @Put('/:id')
    async updateExpense(
        @Param('id', ParseUUIDPipe, ExpenseIdValidator) id: string,
        @Body() data: UpsertExpense,
    ) {
        const res = await this.expensesService.updateExpense(id, data);
        return getSuccessResponse(Messages.GeneralSuccess, res);
    }

    @Delete('/:id')
    async deleteExpense(@Param('id', ParseUUIDPipe, ExpenseIdValidator) id: string) {
        const res = await this.expensesService.deleteExpense(id);
        return getSuccessResponse(Messages.GeneralSuccess, res);
    }
}
