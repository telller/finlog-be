import { ApiTags } from '@nestjs/swagger';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ExpenseIdValidator } from '@src/common/pipes/entityIdValidation/ExpenseIdValidator';
import { CreateExpenseDto } from '@src/modules/expenses/dto/createExpense.dto';
import { GetExpensesDto } from '@src/modules/expenses/dto/getExpenses.dto';
import { getSuccessResponse } from '@src/common/utils/getResponse';
import { ExpensesService } from '@src/services/expenses.service';
import { Messages } from '@src/common/constants/messages';
import { AuthGuard } from '@src/common/guards/auth.guard';

@ApiTags('Expenses')
@Controller('expenses')
@UseGuards(AuthGuard)
export class ExpensesController {
    constructor(private expensesService: ExpensesService) {}

    @Get('/list')
    async getExpensesList(@Query() data: GetExpensesDto) {
        const res = await this.expensesService.getExpenses(data);
        return getSuccessResponse(Messages.GeneralSuccess, res);
    }

    @Post('/')
    async createTag(@Body() data: CreateExpenseDto) {
        const res = await this.expensesService.createExpense(data);
        return getSuccessResponse(Messages.GeneralSuccess, res);
    }

    @Delete('/:id')
    async deleteTag(@Param('id', ParseUUIDPipe, ExpenseIdValidator) id: string) {
        const res = await this.expensesService.deleteExpense(id);
        return getSuccessResponse(Messages.GeneralSuccess, res);
    }
}
