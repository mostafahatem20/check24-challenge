import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QualityFactorScore } from './entities/quality-factor-score.entity';
import { QualityFactorScoreController } from './quality-factor-scores.controller';
import { QualityFactorScoreService } from './quality-factor-scores.service';

@Module({
  imports: [TypeOrmModule.forFeature([QualityFactorScore])],
  controllers: [QualityFactorScoreController],
  providers: [QualityFactorScoreService],
  exports: [QualityFactorScoreService, TypeOrmModule],
})
export class QualityFactorScoreModule {}
