import { Module } from '@nestjs/common';
import { CraftsmenModule } from './craftsmen/craftsmen.module';
import { PostalCodesModule } from './postal-codes/postal-codes.module';
import { QualityFactorScoreModule } from './quality-factor-scores/quality-factor-scores.module';
import { DataModule } from './data/data.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Craftsman } from './craftsmen/entities/craftsman.entity';
import { PostalCode } from './postal-codes/entities/postal-code.entity';
import { QualityFactorScore } from './quality-factor-scores/entities/quality-factor-score.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CraftsmenModule,
    PostalCodesModule,
    QualityFactorScoreModule,
    DataModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      host: 'postgres',
      username: 'postgres',
      database: 'check24',
      entities: [Craftsman, PostalCode, QualityFactorScore],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
