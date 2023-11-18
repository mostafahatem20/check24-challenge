import { Module } from '@nestjs/common';
import { PostalCodesService } from './postal-codes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostalCode } from './entities/postal-code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostalCode])],
  providers: [PostalCodesService],
  exports: [PostalCodesService, TypeOrmModule],
})
export class PostalCodesModule {}
