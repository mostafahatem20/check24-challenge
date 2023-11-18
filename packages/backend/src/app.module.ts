import { Module } from '@nestjs/common';
import { CraftsmenModule } from './craftsmen/craftsmen.module';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports: [CraftsmenModule, ProfilesModule],
})
export class AppModule {}
