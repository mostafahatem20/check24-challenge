import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QualityFactorScore } from './entities/quality-factor-score.entity';
import { QualityFactorScoreService } from './quality-factor-scores.service';

@Module({
  imports: [TypeOrmModule.forFeature([QualityFactorScore])],
  providers: [QualityFactorScoreService],
  exports: [QualityFactorScoreService, TypeOrmModule],
})
export class QualityFactorScoreModule {}
