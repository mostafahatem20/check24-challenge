import { Module } from '@nestjs/common';
import { CraftsmenModule } from './craftsmen/craftsmen.module';
import { PostalCodesModule } from './postal-codes/postal-codes.module';
import { QualityFactorScoreModule } from './quality-factor-score/quality-factor-score.module';
import { DataModule } from './data/data.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Craftsman } from './craftsmen/entities/craftsman.entity';
import { PostalCode } from './postal-codes/entities/postal-code.entity';
import { QualityFactorScore } from './quality-factor-score/entities/quality-factor-score.entity';

@Module({
    imports: [
        ConfigModule.forRoot(),
        CraftsmenModule,
        PostalCodesModule,
        QualityFactorScoreModule,
        DataModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            port: parseInt(process.env.DB_PORT) || 5432,
            username: process.env.DB_HOSTNAME || 'localhost',
            database: process.env.DB_DATABASE_NAME || 'check24',
            entities: [Craftsman, PostalCode, QualityFactorScore],
        }),
    ],
})
export class AppModule {}
