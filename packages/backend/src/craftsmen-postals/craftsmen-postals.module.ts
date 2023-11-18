import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CraftsmenPostalsService } from './craftsmen-postals.service';
import { CraftsmanPostal } from './entities/craftsman-postal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CraftsmanPostal])],
  providers: [CraftsmenPostalsService],
  exports: [CraftsmenPostalsService, TypeOrmModule],
})
export class CraftsmenPostalsModule {}
