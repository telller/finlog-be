import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
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
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ExpenseIdValidator } from '@src/common/pipes/entityIdValidation/ExpenseIdValidator';
import { UpsertExpense } from '@src/modules/expenses/dto/upsertExpense';
import { getSuccessResponse } from '@src/common/utils/getResponse';
import { ExpensesService } from '@src/services/expenses.service';
import { PaginationDto } from '@src/common/dto/pagination.dto';
import { Messages } from '@src/common/constants/messages';
import { AuthGuard } from '@src/common/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadDto } from '@src/modules/expenses/dto/fileUpload.dto';

@ApiTags('Expenses')
@Controller('expenses')
// @ApiBearerAuth('jwt')
// @UseGuards(AuthGuard)
export class ExpensesController {
    constructor(private expensesService: ExpensesService) {}

    @Get('/list')
    async getExpensesList(@Query() data: PaginationDto) {
        const res = await this.expensesService.getExpenses(data);
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

    @Post('/upload')
    @UseInterceptors(FileInterceptor('file'))
    @ApiBody({
        description: 'Select file to upload',
        type: FileUploadDto,
    })
    @ApiConsumes('multipart/form-data')
    async importFromXlsx(@UploadedFile() file: Express.Multer.File) {
        const res = await this.expensesService.importFromXlsx(file);
        return getSuccessResponse(Messages.GeneralSuccess, res);
    }
}
