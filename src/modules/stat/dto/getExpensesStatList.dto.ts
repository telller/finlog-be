import { IntersectionType } from '@nestjs/swagger';

import { ExpensesStatFilterDto } from '@src/modules/stat/dto/expensesStatFilter.dto';
import { PaginationDto } from '@src/common/dto/pagination.dto';

export class GetExpensesStatListDto extends IntersectionType(
    ExpensesStatFilterDto,
    PaginationDto,
) {}
