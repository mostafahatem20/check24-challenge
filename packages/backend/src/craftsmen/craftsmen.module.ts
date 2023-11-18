import { Module } from '@nestjs/common';
import { CraftsmenService } from './craftsmen.service';
import { CraftsmenController } from './craftsmen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Craftsman } from './entities/craftsman.entity';
import { QualityFactorScoreModule } from 'src/quality-factor-scores/quality-factor-scores.module';
import { CraftsmenPostalsModule } from 'src/craftsmen-postals/craftsmen-postals.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Craftsman]),
        QualityFactorScoreModule,
        CraftsmenPostalsModule,
    ],
    controllers: [CraftsmenController],
    providers: [CraftsmenService],
    exports: [CraftsmenService, TypeOrmModule],
})
export class CraftsmenModule {}
