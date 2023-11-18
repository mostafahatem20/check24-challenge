import { Module } from '@nestjs/common';
import { CraftsmenService } from './craftsmen.service';
import { CraftsmenController } from './craftsmen.controller';
import { QualityFactorScoreModule } from 'src/quality-factor-score/quality-factor-score.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Craftsman } from './entities/craftsman.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Craftsman]), QualityFactorScoreModule],
    controllers: [CraftsmenController],
    providers: [CraftsmenService],
})
export class CraftsmenModule {}
