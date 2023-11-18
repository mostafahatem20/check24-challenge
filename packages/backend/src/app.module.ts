import { Module } from '@nestjs/common';
import { CraftsmenModule } from './craftsmen/craftsmen.module';

@Module({
  imports: [CraftsmenModule],
})
export class AppModule {}
