import { Injectable } from '@nestjs/common';
import { CreateCraftsmanDto } from './dto/create-craftsman.dto';
import { UpdateCraftsmanDto } from './dto/update-craftsman.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Craftsman } from './entities/craftsman.entity';
@Injectable()
export class CraftsmenService {
  constructor(
    @InjectRepository(Craftsman)
    private usersRepository: Repository<Craftsman>,
  ) {}

  create(createCraftsmanDto: CreateCraftsmanDto) {
    return 'This action adds a new craftsman';
  }

  findAll() {
    return `This action returns all craftsmen`;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} craftsman`;
  // }
  findOne(id: number){
  }
  


  async getTopRankedCraftsmenByPostalCode(postalCode: string): Promise<Response> {
    const craftsmen = await this.craftsmanPortalRepository
      .createQueryBuilder('craftsman_portal')
      .select([
        'craftsman_portal.id',
        'craftsman_portal.first_name',
        'craftsman_portal.last_name',
        'craftsman_portal.ranking_score',
        'craftsman_portal.distance'
      ])
      .where('craftsman_portal.postal_code = :postalCode', { postalCode })
      .orderBy('craftsman_portal.ranking_score', 'DESC')
      .limit(20)
      .getRawMany();

    const response: Response = {
      craftsmen: craftsmen.map(craftsman => ({
        id: craftsman.id,
        name: `${craftsman.first_name} ${craftsman.last_name}`,
        rankingScore: craftsman.ranking_score,
      })),
    };

    return response;
  }


  async getTopRankedCraftsmenByPostalCodeAndDistance(postalCode: string): Promise<Response> {
    const craftsmen = await this.craftsmanPortalRepository
      .createQueryBuilder('craftsman_portal')
      .select([
        'craftsman_portal.id',
        'craftsman_portal.first_name',
        'craftsman_portal.last_name',
        'craftsman_portal.ranking_score',
        'craftsman_portal.distance'
      ])
      .where('craftsman_portal.postal_code = :postalCode', { postalCode })
      .orderBy('craftsman_portal.ranking_score', 'DESC', 'craftsmen_portal.distance')
      .limit(20)
      .getRawMany();

    const response: Response = {
      craftsmen: craftsmen.map(craftsman => ({
        id: craftsman.id,
        name: `${craftsman.first_name} ${craftsman.last_name}`,
        rankingScore: craftsman.ranking_score,
      })),
    };

    return response;
  }

  async getTopRankedCraftsmenByPostalCodeAndDistance(postalCode: string): Promise<Response> {
    const craftsmen = await this.craftsmanPortalRepository
      .createQueryBuilder('craftsman_portal')
      .select([
        'craftsman_portal.id',
        'craftsman_portal.first_name',
        'craftsman_portal.last_name',
        'craftsman_portal.ranking_score',
        'craftsman_portal.distance'
      ])
      .where('craftsman_portal.postal_code = :postalCode', { postalCode })
      .orderBy('craftsman_portal.ranking_score', 'DESC', 'craftsmen_portal.profilePictureScore * craftsmen_portal.profileDescriptionScore')
      .limit(20)
      .getRawMany();

    const response: Response = {
      craftsmen: craftsmen.map(craftsman => ({
        id: craftsman.id,
        name: `${craftsman.first_name} ${craftsman.last_name}`,
        rankingScore: craftsman.ranking_score,
      })),
    };

    return response;
  }

  async updateCraftsmanAttributes(craftsmanId: number, patchRequest: PatchRequest): Promise<any> {
    const craftsman = await this.craftsmanRepository.findOne(craftsmanId);

    if (!craftsman) {
      throw new NotFoundException(`Craftsman with ID ${craftsmanId} not found`);
    }

    if (patchRequest.maxDrivingDistance !== undefined) {
      //if it decreased then we need to go through craftsman_postal and delete all the records that exceed the new value+group


      //if it increased then we need to calculate new distances and add them to the crafstman_postal table
      craftsman.maxDrivingDistance = patchRequest.maxDrivingDistance;
      
    }

    if (patchRequest.profilePictureScore !== undefined) {
      craftsman.profilePictureScore = patchRequest.profilePictureScore;
      //update rank
      craftsman.ranking_score=craftsman.distance_weight*craftsman.distance_score + (1-craftsman.distance_weight) * (0.4*(craftsman.profilePictureScore)+0.6*(craftsman.profileDescriptionScore))
    }

    if (patchRequest.profileDescriptionScore !== undefined) {
      craftsman.profileDescriptionScore = patchRequest.profileDescriptionScore;
      //update rank
      craftsman.ranking_score=craftsman.distance_weight*craftsman.distance_score + (1-craftsman.distance_weight) * (0.4*(craftsman.profilePictureScore)+0.6*(craftsman.profileDescriptionScore))

    }

    await this.craftsmanRepository.save(craftsman);

    return {
      maxDrivingDistance: craftsman.maxDrivingDistance,
      profilePictureScore: craftsman.profilePictureScore,
      profileDescriptionScore: craftsman.profileDescriptionScore,
    };
  }

  // findNear(postal_code: string){


  // }

  update(id: number, updateCraftsmanDto: UpdateCraftsmanDto) {
    return `This action updates a #${id} craftsman`;
  }

  remove(id: number) {
    return `This action removes a #${id} craftsman`;
  }
}
