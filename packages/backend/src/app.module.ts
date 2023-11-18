import { Module } from '@nestjs/common';
import { CraftsmenModule } from './craftsmen/craftsmen.module';
import { PostalCodesModule } from './postal-codes/postal-codes.module';

@Module({
  imports: [CraftsmenModule, PostalCodesModule],
})
export class AppModule {}
