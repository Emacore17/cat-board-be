import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from 'src/database/entities/region.entity';
import { Province } from 'src/database/entities/province.entity';
import { City } from 'src/database/entities/city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Region, Province, City])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
