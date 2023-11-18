import {
  Controller,
  Get,
  Post,
  Query,
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

  // @Get(':postal_code')
  // findNear(@Param('postal_code') postal_code: string){
  //   return this.craftsmenService.findNear(postal_code);

  // }

  @Get()
  async getCraftsmenByPostalCode(@Query('postalcode') postalCode: string): Promise<Response> {
    // Assuming you have a method in craftsmenService to get the top 20 ranked service providers by postal code
    const craftsmen: Craftsman[] = await this.craftsmenService.getTopRankedCraftsmenByPostalCode(postalCode);

    return { craftsmen };
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

  @Patch(':craftsman_id') //not sure
  async updateCraftsman(
    @Param('craftsman_id') craftsmanId: number,
    @Body() patchRequest: UpdateCraftsmanDto,
  ): Promise<UpdateCraftsmanDto> {
    const updatedAttributes = await this.craftsmenService.updateCraftsmanAttributes(craftsmanId, patchRequest);

    return {
      id: craftsmanId,
      updated: updatedAttributes,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.craftsmenService.remove(+id);
  }
}
