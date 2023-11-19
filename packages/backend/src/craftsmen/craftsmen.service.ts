import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Craftsman } from './entities/craftsman.entity';
import { PatchRequest } from '@not-so-software/shared';
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

  // async getTopRankedCraftsmenByPostalCode(
  //   postalCode: string,
  // ): Promise<Response> {
  //   const craftsmen = await this.craftsmanRepository
  //     .createQueryBuilder('craftsman_postal')
  //     .select([
  //       'craftsman_postal.id',
  //       'craftsman_postal.first_name',
  //       'craftsman_postal.last_name',
  //       'craftsman_postal.ranking_score',
  //       'craftsman_postal.distance',
  //     ])
  //     .where('craftsman_postal.postal_code = :postalCode', { postalCode })
  //     .orderBy('craftsman_postal.ranking_score', 'DESC')
  //     .limit(20)
  //     .getRawMany();

  //   const response: Response = {
  //     craftsmen: craftsmen.map((craftsman) => ({
  //       id: craftsman.id,
  //       name: `${craftsman.first_name} ${craftsman.last_name}`,
  //       rankingScore: craftsman.ranking_score,
  //     })),
  //   };

  //   return response;
  // }
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

  async findAll() {}

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

//   const queryRunner = this.craftsmanRepository.queryRunner;
//   try {
//     await queryRunner.startTransaction();
//     const craftsman = await this.craftsmanRepository.findOne({
//       where: { id },
//     });
//     if (!craftsman) {
//       throw new NotFoundException(`Craftsman with ID ${id} not found`);
//     }
//     if (payload.maxDrivingDistance !== undefined) {
//       // if it decreased then we need to go through craftsman_postal and delete all the records that exceed the new value+group
//       // if it increased then we need to calculate new distances and add them to the crafstman_postal table
//       // craftsman.max_driving_distance = payload.maxDrivingDistance;
//       // const craftsmanQuery = {
//       //     where: { id },
//       //     data: { max_driving_distance: payload.maxDrivingDistance },
//       // };
//       // queryRunner.manager.update(
//       //     Craftsman,
//       //     craftsmanQuery.where,
//       //     craftsmanQuery.data,
//       // );
//     }
//     const oldRankingQuery = { where: { score: { profile_id: id } } };
//     const oldRankings = await queryRunner.manager.find(
//       CraftsmanPostal,
//       oldRankingQuery,
//     );
//     const defaultDistance = 80;
//     oldRankings.forEach(async (entry) => {
//       const distanceScore = 1 - (entry.distance * 1.0) / defaultDistance;
//       const distanceWeight = entry.distance > defaultDistance ? 0.01 : 0.15;
//       let newRanking = entry.rank;
//       newRanking =
//         distanceWeight * distanceScore +
//         (1 - distanceWeight) *
//           (0.4 *
//             (payload.profilePictureScore
//               ? payload.profilePictureScore
//               : entry.score.profile_picture_score) +
//           0.6 * payload.profileDescriptionScore
//             ? payload.profileDescriptionScore
//             : entry.score.profile_description_score);
//       const newRankingQuery = {
//         where: { id: entry.id },
//         data: { rank: newRanking },
//       };
//       await queryRunner.manager.update(
//         CraftsmenPostal,
//         newRankingQuery.where,
//         newRankingQuery.data,
//       );
//       const qualityUpdateQuery = {
//         where: { profile_id: id },
//         data: {
//           profile_picture_score: payload.profilePictureScore,
//           profile_description_score: payload.profileDescriptionScore,
//         },
//       };
//       await queryRunner.manager.update(
//         QualityFactorScore,
//         qualityUpdateQuery.where,
//         qualityUpdateQuery.data,
//       );
//     });
//     return {
//       status: 'SUCCESS',
//       // maxDrivingDistance: craftsman.maxDrivingDistance,
//       // profilePictureScore: craftsman.profilePictureScore,
//       // profileDescriptionScore: craftsman.profileDescriptionScore,
//     };
//   } catch (e) {
//     console.error(`An error occurred: ${e}`);
//   } finally {
//     queryRunner.release();
//   }
