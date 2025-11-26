import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetExpensesStatListDto } from '@src/modules/stat/dto/getExpensesStatList.dto';
import { ExpensesStatFilterDto } from '@src/modules/stat/dto/expensesStatFilter.dto';
import { getSuccessResponse } from '@src/common/utils/getResponse';
import { Messages } from '@src/common/constants/messages';
import { AuthGuard } from '@src/common/guards/auth.guard';
import { StatService } from '@src/services/stat.service';

@ApiTags('Statistics')
@Controller('stat')
@UseGuards(AuthGuard)
export class StatController {
    constructor(private statService: StatService) {}

    @Get('/tags-stat')
    async getTagsStat(@Query() data: ExpensesStatFilterDto) {
        const res = await this.statService.getTagsStat(data);
        return getSuccessResponse(Messages.GeneralSuccess, res);
    }

    @Get('/days-stat')
    async getDaysStat(@Query() data: ExpensesStatFilterDto) {
        const res = await this.statService.getDaysStat(data);
        return getSuccessResponse(Messages.GeneralSuccess, res);
    }

    @Get('/expenses-list')
    async getExpensesStatList(@Query() data: GetExpensesStatListDto) {
        const res = await this.statService.getExpensesStatList(data);
        return getSuccessResponse(Messages.GeneralSuccess, res);
    }
}
