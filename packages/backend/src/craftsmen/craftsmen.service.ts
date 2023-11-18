import { Injectable } from '@nestjs/common';
import { CreateCraftsmanDto } from './dto/create-craftsman.dto';
import { UpdateCraftsmanDto } from './dto/update-craftsman.dto';

@Injectable()
export class CraftsmenService {
  create(createCraftsmanDto: CreateCraftsmanDto) {
    return 'This action adds a new craftsman';
  }

  findAll() {
    return `This action returns all craftsmen`;
  }

  findOne(id: number) {
    return `This action returns a #${id} craftsman`;
  }

  update(id: number, updateCraftsmanDto: UpdateCraftsmanDto) {
    return `This action updates a #${id} craftsman`;
  }

  remove(id: number) {
    return `This action removes a #${id} craftsman`;
  }
}
