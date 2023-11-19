import { Module } from '@nestjs/common';
import { CraftsmenPostalsModule } from 'src/craftsmen-postals/craftsmen-postals.module';
import { CraftsmenModule } from 'src/craftsmen/craftsmen.module';
import { PostalCodesModule } from 'src/postal-codes/postal-codes.module';
import { QualityFactorScoreModule } from 'src/quality-factor-scores/quality-factor-scores.module';
import { DataService } from './data.service';

@Module({
  imports: [
    CraftsmenModule,
    QualityFactorScoreModule,
    PostalCodesModule,
    CraftsmenPostalsModule,
  ],
  providers: [DataService],
  exports: [DataService],
})
export class DataModule {}
