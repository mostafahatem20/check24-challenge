import { Module } from '@nestjs/common';
import { CraftsmenService } from './craftsmen.service';
import { CraftsmenController } from './craftsmen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Craftsman } from './entities/craftsman.entity';
import { QualityFactorScoreModule } from 'src/quality-factor-scores/quality-factor-scores.module';

@Module({
  imports: [TypeOrmModule.forFeature([Craftsman]), QualityFactorScoreModule],
  controllers: [CraftsmenController],
  providers: [CraftsmenService],
  exports: [CraftsmenService, TypeOrmModule],
})
export class CraftsmenModule {}
