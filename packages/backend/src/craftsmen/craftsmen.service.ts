import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Craftsman } from './entities/craftsman.entity';
import { GetCraftsmen, PatchRequest } from '@not-so-software/shared';
import { QualityFactorScore } from 'src/quality-factor-scores/entities/quality-factor-score.entity';
import { CraftsmanPostal } from 'src/craftsmen-postals/entities/craftsman-postal.entity';

@Injectable()
export class CraftsmenService {
  constructor(
    @InjectRepository(Craftsman)
    private readonly craftsmanRepository: Repository<Craftsman>,

    @InjectRepository(QualityFactorScore)
    private readonly qualityScoreRepository: Repository<QualityFactorScore>,

    @InjectRepository(CraftsmanPostal)
    private readonly craftsmanPostalRepository: Repository<CraftsmanPostal>,
  ) {}

  async findAll({ page, limit, postalCode, sortBy, sort }: GetCraftsmen) {
    const queryBuilder = this.craftsmanRepository.createQueryBuilder('c');
    let joinQuery = queryBuilder
      .leftJoin('c.postals', 'p')
      .addSelect('p.distance')
      .addSelect('p.profile_score');

    if (postalCode) {
      joinQuery = joinQuery.where('p.postcode = :code', {
        code: postalCode,
      });
    }

    if (sortBy && sort) {
      const sortParam =
        sortBy === 'Distance' ? 'p.distance' : 'p.profile_score';
      joinQuery = joinQuery.orderBy(sortParam, sort);
    }

    const result = await joinQuery
      .skip(page * limit)
      .take(limit)
      .getMany();
    return result;
  }

  async updateCraftsmanPostal(
    craftsman: Craftsman,
    {
      profileDescriptionScore,
      profilePictureScore,
      maxDrivingDistance,
    }: PatchRequest,
  ) {
    if (maxDrivingDistance) {
      if (maxDrivingDistance > craftsman.max_driving_distance) {
      } else if (maxDrivingDistance > craftsman.max_driving_distance) {
      }
    }

    if (profileDescriptionScore || profilePictureScore) {
      const defaultDistance = 80;
      const craftsmenPostalToUpdate = await this.craftsmanPostalRepository.find(
        { where: { craftsman: { id: craftsman.id } } },
      );

      const updatedRecords = craftsmenPostalToUpdate.map((craftsmanPostal) => {
        const distanceScore = 1 - craftsmanPostal.distance / defaultDistance;
        const distanceWeight =
          craftsmanPostal.distance > defaultDistance ? 0.01 : 0.15;

        const profileScore =
          0.4 * profilePictureScore + 0.6 * profileDescriptionScore;
        const rank =
          distanceWeight * distanceScore + (1 - distanceWeight) * profileScore;

        craftsmanPostal.profile_score = profileScore;
        craftsmanPostal.rank = rank;

        return craftsmanPostal;
      });

      await this.craftsmanPostalRepository.save(updatedRecords);
    }
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

    // update new table but don't wait for it
    this.updateCraftsmanPostal(
      { ...craftsman },
      {
        maxDrivingDistance,
        profileDescriptionScore,
        profilePictureScore,
      },
    );

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
