import { Module } from '@nestjs/common';
import { ServicesModule } from '@src/services/services.module';
import { TagController } from './tag.controller';

@Module({
    imports: [ServicesModule],
    controllers: [TagController],
})
export class TagModule {}
