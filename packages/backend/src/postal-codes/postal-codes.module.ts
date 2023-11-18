import { Module } from '@nestjs/common';
import { PostalCodesService } from './postal-codes.service';
import { PostalCodesController } from './postal-codes.controller';

@Module({
  controllers: [PostalCodesController],
  providers: [PostalCodesService],
})
export class PostalCodesModule {}
