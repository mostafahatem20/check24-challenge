// import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Craftsman } from 'src/craftsmen/entities/craftsman.entity';
// import { PostalCode } from 'src/postal-codes/entities/postal-code.entity';
// import { QualityFactorScore } from 'src/quality-factor-scores/entities/quality-factor-score.entity';

@Injectable()
export class DataService {
  // constructor(
  //   @InjectRepository(Craftsman)
  //   private readonly craftsmanRepository: Repository<Craftsman>,
  //   @InjectRepository(PostalCode)
  //   private readonly postalCodeRepository: Repository<PostalCode>,
  //   @InjectRepository(QualityFactorScore)
  //   private readonly qualityFactorScoreRepository: Repository<QualityFactorScore>,
  // ) {}
  // async onModuleInit() {
  //   const isPopulated = await this.isDatabasePopulated();
  //   if (isPopulated) return;
  //   await this.populateDatabase();
  // }
  // private async isDatabasePopulated(): Promise<boolean> {
  //   const countCraftsman = await this.craftsmanRepository.count();
  //   const countPostalCode = await this.postalCodeRepository.count();
  //   const countScore = await this.qualityFactorScoreRepository.count();
  //   return countCraftsman > 0 && countPostalCode > 0 && countScore > 0;
  // }
  // private async populateDatabase(): Promise<void> {
  //   const craftsmanFilePath = '../seeds/service_provider_profile.json';
  //   const craftsmanFileContent = fs.readFileSync(craftsmanFilePath, 'utf-8');
  //   const craftsmanSeed = JSON.parse(craftsmanFileContent);
  //   await this.craftsmanRepository.save(craftsmanSeed);
  //   const postalCodeFilePath = '../seeds/postcode.json';
  //   const postalCodeFileContent = fs.readFileSync(postalCodeFilePath, 'utf-8');
  //   const postalCodeSeed = JSON.parse(postalCodeFileContent);
  //   await this.postalCodeRepository.save(postalCodeSeed);
  //   const qualityScoreFilePath = '../seeds/quality_factor_score.json';
  //   const qualityScoreFileContent = fs.readFileSync(
  //     qualityScoreFilePath,
  //     'utf-8',
  //   );
  //   const qualityScoreSeed = JSON.parse(qualityScoreFileContent);
  //   await this.qualityFactorScoreRepository.save(qualityScoreSeed);
  // }
}
