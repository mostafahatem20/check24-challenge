import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Craftsman } from 'src/craftsmen/entities/craftsman.entity';
import { PostalCode } from 'src/postal-codes/entities/postal-code.entity';
import { QualityFactorScore } from 'src/quality-factor-scores/entities/quality-factor-score.entity';
import * as postcodeData from './seeds/postcode.json';
import * as qualityFactorScoreData from './seeds/quality_factor_score.json';
import * as serviceProviderProfileData from './seeds/service_provider_profile.json';
@Injectable()
export class DataService {
  constructor(
    @InjectRepository(Craftsman)
    private readonly craftsmanRepository: Repository<Craftsman>,
    @InjectRepository(PostalCode)
    private readonly postalCodeRepository: Repository<PostalCode>,
    @InjectRepository(QualityFactorScore)
    private readonly qualityFactorScoreRepository: Repository<QualityFactorScore>,
  ) {}

  async onModuleInit() {
    const isPopulated = await this.isDatabasePopulated();
    if (isPopulated) return;
    await this.populateDatabase();
  }

  private async isDatabasePopulated(): Promise<boolean> {
    const countCraftsman = await this.craftsmanRepository.count();
    const countPostalCode = await this.postalCodeRepository.count();
    const countScore = await this.qualityFactorScoreRepository.count();
    return countCraftsman > 0 && countPostalCode > 0 && countScore > 0;
  }

  private async populateDatabase(): Promise<void> {
    const chunkArray = (arr, chunkSize) => {
      const chunks = [];
      for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        chunks.push(chunk);
      }
      return chunks;
    };

    // Craftsmen inserts
    const craftsmenSeed = chunkArray(serviceProviderProfileData, 100);
    craftsmenSeed.forEach(async (entry) => {
      await this.craftsmanRepository
        .createQueryBuilder()
        .insert()
        .values(entry)
        .execute();
    });

    // Postal code seeds
    const postalCodeSeed = chunkArray(postcodeData, 100);
    postalCodeSeed.forEach(async (entry) => {
      await this.postalCodeRepository
        .createQueryBuilder()
        .insert()
        .values(entry)
        .execute();
    });

    // Quality Factor Inserts
    const qualityFactorSeed = chunkArray(qualityFactorScoreData, 100);
    qualityFactorSeed.forEach(async (entry) => {
      await this.qualityFactorScoreRepository
        .createQueryBuilder()
        .insert()
        .values(entry)
        .execute();
    });
  }
}
