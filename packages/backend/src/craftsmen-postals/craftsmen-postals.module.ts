import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CraftsmenPostalsService } from './craftsmen-postals.service';
import { CraftsmenPostal } from './entities/craftsmen-postal.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CraftsmenPostal])],
    providers: [CraftsmenPostalsService],
    exports: [CraftsmenPostalsService, TypeOrmModule],
})
export class CraftsmenPostalsModule {}
