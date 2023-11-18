import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QualityFactorScore } from './entities/quality-factor-score.entity';

@Injectable()
export class QualityFactorScoreService {
  constructor(
    @InjectRepository(QualityFactorScore)
    private usersRepository: Repository<QualityFactorScore>,
  ) {}
}
