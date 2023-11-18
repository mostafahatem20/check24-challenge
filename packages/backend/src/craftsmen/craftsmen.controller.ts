import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { CraftsmenService } from './craftsmen.service';
import { UpdateCraftsmanDto } from './dto/update-craftsman.dto';

@Controller('craftsmen')
export class CraftsmenController {
    constructor(private readonly craftsmenService: CraftsmenService) {}

    @Get()
    findAll() {
        return this.craftsmenService.findAll();
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCraftsmanDto: UpdateCraftsmanDto,
    ) {
        return this.craftsmenService.update(+id, updateCraftsmanDto);
    }
}
