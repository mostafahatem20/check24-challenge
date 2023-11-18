import { Module } from '@nestjs/common';
import { CraftsmenPostalsService } from './craftsmen-postals.service';

@Module({
  providers: [CraftsmenPostalsService],
  exports: [CraftsmenPostalsService]
})
export class CraftsmenPostalsModule {}
