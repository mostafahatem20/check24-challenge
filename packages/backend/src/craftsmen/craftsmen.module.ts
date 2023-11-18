import { Module } from '@nestjs/common';
import { CraftsmenService } from './craftsmen.service';
import { CraftsmenController } from './craftsmen.controller';

@Module({
  controllers: [CraftsmenController],
  providers: [CraftsmenService],
})
export class CraftsmenModule {}
