import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Craftsman } from 'src/craftsmen/entities/craftsman.entity';
import { PostalCode } from 'src/postal-codes/entities/postal-code.entity';
import { QualityFactorScore } from 'src/quality-factor-scores/entities/quality-factor-score.entity';
import * as postcodeData from './seeds/postcode.json';
import * as qualityFactorScoreData from './seeds/quality_factor_score.json';
import * as serviceProviderProfileData from './seeds/service_provider_profile.json';
import { CraftsmanPostal } from 'src/craftsmen-postals/entities/craftsman-postal.entity';
@Injectable()
export class DataService {
  constructor(
    @InjectRepository(Craftsman)
    private readonly craftsmanRepository: Repository<Craftsman>,
    @InjectRepository(PostalCode)
    private readonly postalCodeRepository: Repository<PostalCode>,
    @InjectRepository(QualityFactorScore)
    private readonly qualityFactorScoreRepository: Repository<QualityFactorScore>,
    @InjectRepository(CraftsmanPostal)
    private readonly craftsmanPostalRepository: Repository<CraftsmanPostal>,
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

    this.createCraftsmanPostalTable();
  }
  async createCraftsmanPostalTable() {
    const subQuery = await this.craftsmanRepository
      .createQueryBuilder()
      .select([
        'spp.id',
        'pc.postcode',
        'qfs.profile_picture_score',
        'qfs.profile_description_score',
        `ACOS(SIN(spp.lat) * SIN(pc.lat) + COS(spp.lat) * COS(pc.lat) * COS(spp.lon - pc.lon)) * 6371 as distance`,
      ])
      .from('craftsman', 'spp')
      .innerJoin('quality_factor_score', 'qfs', 'spp.id = qfs.profile_id')
      .innerJoin(
        'postal_code',
        'pc',
        `ACOS(SIN(spp.lat) * SIN(pc.lat) + COS(spp.lat) * COS(pc.lat) * COS(spp.lon - pc.lon)) * 6371 < CASE WHEN pc.postcode_extension_distance_group = 'group_b' THEN max_driving_distance + 2 WHEN pc.postcode_extension_distance_group = 'group_c' THEN max_driving_distance + 5 ELSE max_driving_distance END`,
      )
      .getRawMany();
    console.log(subQuery);
    // await this.craftsmanPostalRepository
    //   .createQueryBuilder()
    //   .insert()
    //   .addSelect('id')
    //   .addSelect('postal_code')
    //   .addSelect('first_name')
    //   .addSelect('last_name')
    //   .addSelect('profile_picture_score')
    //   .addSelect('profile_description_score')
    //   .addSelect('distance')
    //   .fromQuery(subQuery, 'craftsman_postal');
  }
}
