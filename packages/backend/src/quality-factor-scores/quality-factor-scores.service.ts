import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QualityFactorScoreService {
  constructor(
    @InjectRepository(QualityFactorScoreService)
    private usersRepository: Repository<QualityFactorScoreService>,
  ) {}
}
