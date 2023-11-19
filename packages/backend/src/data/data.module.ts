import { Module } from '@nestjs/common';
import { CraftsmenModule } from 'src/craftsmen/craftsmen.module';
import { PostalCodesModule } from 'src/postal-codes/postal-codes.module';
import { QualityFactorScoreModule } from 'src/quality-factor-scores/quality-factor-scores.module';
import { DataService } from './data.service';

@Module({
  imports: [CraftsmenModule, QualityFactorScoreModule, PostalCodesModule],
  providers: [DataService],
  exports: [DataService],
})
export class DataModule {}
