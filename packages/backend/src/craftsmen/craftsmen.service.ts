import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Craftsman } from './entities/craftsman.entity';
import { PatchRequest } from '@not-so-software/shared';
import { QualityFactorScore } from 'src/quality-factor-scores/entities/quality-factor-score.entity';
import { GetCraftsmen } from '@not-so-software/shared';

@Injectable()
export class CraftsmenService {
  constructor(
    @InjectRepository(Craftsman)
    private readonly craftsmanRepository: Repository<Craftsman>,

    @InjectRepository(QualityFactorScore)
    private readonly qualityScoreRepository: Repository<QualityFactorScore>,
  ) {}

  async findAll({ postalCode, page, limit, sort, sortBy }: GetCraftsmen) {
    const offset = (parseInt(page) - 1) * parseInt(limit);
    if (postalCode) {
      const x =
        '(6371 * acos(cos(radians(spp.lat)) * cos(radians(pc.lat)) * cos(radians(pc.lon) - radians(spp.lon)) + sin(radians(spp.lat)) * sin(radians(pc.lat))))';
      const p =
        '0.4*qfs.profile_picture_score + 0.6*qfs.profile_description_score';
      const craftsmen = await this.craftsmanRepository.query(`
    SELECT 
      spp.id as "craftsmanId",
      pc.postcode,
      ${x} AS distance,
      ${p} as profile_score,
      (CASE 
        WHEN ${x} > 80 THEN 0.01 * (1 - (${x} / 80)) + (1 - 0.01) * (${p})
        ELSE 0.15 * (1 - (${x} / 80)) + (1 - 0.15) * (${p})
      END) AS rank
    FROM
      craftsman spp
    INNER JOIN
      quality_factor_score qfs ON spp.id = qfs.profile_id
    INNER JOIN
      postal_code pc ON 
        CASE
          WHEN pc.postcode_extension_distance_group = 'group_b' THEN 
            ACOS(SIN(spp.lat) * SIN(pc.lat) + COS(spp.lat) * COS(pc.lat) * COS(spp.lon - pc.lon)) * 6371 <= spp.max_driving_distance + 2000
          WHEN pc.postcode_extension_distance_group = 'group_c' THEN 
            ACOS(SIN(spp.lat) * SIN(pc.lat) + COS(spp.lat) * COS(pc.lat) * COS(spp.lon - pc.lon)) * 6371 <= spp.max_driving_distance + 5000
          ELSE
            ACOS(SIN(spp.lat) * SIN(pc.lat) + COS(spp.lat) * COS(pc.lat) * COS(spp.lon - pc.lon)) * 6371 <= spp.max_driving_distance
        END
    Where
      pc.postcode = '${postalCode}'
    LIMIT ${parseInt(limit)} OFFSET ${offset}
  `);
      return craftsmen;
    }
    return await this.craftsmanRepository
      .createQueryBuilder('spp')
      .offset(offset)
      .limit(parseInt(limit))
      .getRawMany();
  }

  async update(
    id: number,
    {
      maxDrivingDistance,
      profileDescriptionScore,
      profilePictureScore,
    }: PatchRequest,
  ) {
    // Find the craftsman by ID
    const craftsman = await this.craftsmanRepository.findOne({
      where: { id },
      relations: ['score'],
    });

    if (!craftsman) {
      throw new Error(`Craftsman with ID ${id} not found`);
    }

    if (!craftsman.score) {
      throw new Error(`Quality score not found for Craftsman with ID ${id}`);
    }

    // Update craftsman's max driving distance if given
    if (maxDrivingDistance) {
      craftsman.max_driving_distance = maxDrivingDistance;
      await this.craftsmanRepository.save(craftsman);
    }

    // Update quality score with profile description score and/or profile picture score if given
    if (profileDescriptionScore) {
      craftsman.score.profile_description_score = profileDescriptionScore;
    }

    if (profilePictureScore) {
      craftsman.score.profile_picture_score = profilePictureScore;
    }

    await this.qualityScoreRepository.save(craftsman.score);

    return {
      id,
      updated: {
        maxDrivingDistance: craftsman.max_driving_distance,
        profilePictureScore: craftsman.score.profile_description_score,
        profileDescriptionScore: craftsman.score.profile_picture_score,
      },
    };
  }
}
