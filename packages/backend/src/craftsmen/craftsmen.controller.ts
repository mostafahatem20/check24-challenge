import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CraftsmenService } from './craftsmen.service';
import { CreateCraftsmanDto } from './dto/create-craftsman.dto';
import { UpdateCraftsmanDto } from './dto/update-craftsman.dto';

@Controller('craftsmen')
export class CraftsmenController {
  constructor(private readonly craftsmenService: CraftsmenService) {}

  @Post()
  create(@Body() createCraftsmanDto: CreateCraftsmanDto) {
    return this.craftsmenService.create(createCraftsmanDto);
  }

  @Get()
  findAll() {
    return this.craftsmenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.craftsmenService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCraftsmanDto: UpdateCraftsmanDto,
  ) {
    return this.craftsmenService.update(+id, updateCraftsmanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.craftsmenService.remove(+id);
  }
}
