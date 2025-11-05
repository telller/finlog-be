import { Module } from '@nestjs/common';
import { ServicesModule } from '@src/services/services.module';
import { ExpensesController } from './expenses.controller';

@Module({
    imports: [ServicesModule],
    controllers: [ExpensesController],
})
export class ExpensesModule {}
