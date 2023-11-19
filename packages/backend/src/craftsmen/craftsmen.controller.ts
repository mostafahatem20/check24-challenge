import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { CraftsmenService } from './craftsmen.service';
import { GetCraftsmen, PatchRequest } from '@not-so-software/shared';

@Controller('craftsmen')
export class CraftsmenController {
    constructor(private readonly craftsmenService: CraftsmenService) {}

    @Get()
    findAll(@Body() payload: GetCraftsmen) {
        return this.craftsmenService.findAll(payload);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCraftsmanDto: PatchRequest) {
        return this.craftsmenService.update(+id, updateCraftsmanDto);
    }
}
