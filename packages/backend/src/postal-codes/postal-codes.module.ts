import { Module } from '@nestjs/common';
import { PostalCodesService } from './postal-codes.service';
import { PostalCodesController } from './postal-codes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostalCode } from './entities/postal-code.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PostalCode])],
    controllers: [PostalCodesController],
    providers: [PostalCodesService],
})
export class PostalCodesModule {}
