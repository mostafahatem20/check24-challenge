import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CraftsmenModule } from 'src/craftsmen/craftsmen.module';
import { QualityFactorScore } from './entities/quality-factor-score.entity';
import { QualityFactorScoreController } from './quality-factor-score.controller';
import { QualityFactorScoreService } from './quality-factor-score.service';

@Module({
    imports: [TypeOrmModule.forFeature([QualityFactorScore]), CraftsmenModule],
    controllers: [QualityFactorScoreController],
    providers: [QualityFactorScoreService],
})
export class QualityFactorScoreModule {}
