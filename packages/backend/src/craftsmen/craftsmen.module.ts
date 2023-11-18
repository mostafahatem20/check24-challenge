import { Module } from '@nestjs/common';
import { CraftsmenService } from './craftsmen.service';
import { CraftsmenController } from './craftsmen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Craftsman } from './entities/craftsman.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Craftsman])],
  controllers: [CraftsmenController],
  providers: [CraftsmenService],
  exports: [CraftsmenService, TypeOrmModule],
})
export class CraftsmenModule {}
