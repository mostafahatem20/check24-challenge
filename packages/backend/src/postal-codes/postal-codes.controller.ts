import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostalCodesService } from './postal-codes.service';
import { CreatePostalCodeDto } from './dto/create-postal-code.dto';
import { UpdatePostalCodeDto } from './dto/update-postal-code.dto';

@Controller('postal-codes')
export class PostalCodesController {
  constructor(private readonly postalCodesService: PostalCodesService) {}

  @Post()
  create(@Body() createPostalCodeDto: CreatePostalCodeDto) {
    return this.postalCodesService.create(createPostalCodeDto);
  }

  @Get()
  findAll() {
    return this.postalCodesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postalCodesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostalCodeDto: UpdatePostalCodeDto) {
    return this.postalCodesService.update(+id, updatePostalCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postalCodesService.remove(+id);
  }
}
