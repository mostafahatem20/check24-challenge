import { Injectable } from '@nestjs/common';
import { CreatePostalCodeDto } from './dto/create-postal-code.dto';
import { UpdatePostalCodeDto } from './dto/update-postal-code.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostalCode } from './entities/postal-code.entity';
@Injectable()
export class PostalCodesService {
  constructor(
    @InjectRepository(PostalCode)
    private usersRepository: Repository<PostalCode>,
  ) {}

  create(createPostalCodeDto: CreatePostalCodeDto) {
    return 'This action adds a new postalCode';
  }

  findAll() {
    return `This action returns all postalCodes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postalCode`;
  }

  update(id: number, updatePostalCodeDto: UpdatePostalCodeDto) {
    return `This action updates a #${id} postalCode`;
  }

  remove(id: number) {
    return `This action removes a #${id} postalCode`;
  }
}
