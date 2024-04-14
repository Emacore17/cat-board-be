import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from 'src/database/entities/city.entity';
import { Province } from 'src/database/entities/province.entity';
import { Region } from 'src/database/entities/region.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Region) private regionRepository: Repository<Region>,
    @InjectRepository(Province)
    private provinceRepository: Repository<Province>,
    @InjectRepository(City) private cityRepository: Repository<City>,
  ) {}

  async searchLocation(query: string) {
    const cities = await this.cityRepository
      .createQueryBuilder('city')
      .leftJoinAndSelect('city.province', 'province')
      .where('city.name ILike :name', { name: `%${query}%` })
      .select([
        'city.id as id',
        'city.name as name',
        'province.tag as tag',
        "'city' as type",
      ])
      .limit(5)
      .offset(0)
      .getRawMany();

    const provinces = await this.provinceRepository
      .createQueryBuilder('province')
      .where('province.name ILike :name', { name: `%${query}%` })
      .select([
        'province.id as id',
        'province.name as name',
        'province.tag as tag',
        "'province' as type",
      ])
      .limit(3)
      .offset(0)
      .getRawMany();

    const regions = await this.regionRepository
      .createQueryBuilder('region')
      .where('region.name ILike :name', { name: `%${query}%` })
      .select(['region.id as id', 'region.name as name', "'region' as type"])
      .limit(2)
      .offset(0)
      .getRawMany();

    const allResults = [...provinces, ...regions, ...cities];
    allResults.sort((a, b) =>
      a.name === query ? -1 : b.name === query ? 1 : 0,
    );

    return allResults;
  }
}
