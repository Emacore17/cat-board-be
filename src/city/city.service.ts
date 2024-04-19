import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from 'src/database/entities/city.entity';
import { PaginationQueryDto } from 'src/dto/pagination-query.dto';
import { generatePagination } from 'src/utils/generatePagination';
import { Repository } from 'typeorm';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City) private cityRepository: Repository<City>,
  ) {}

  async getAllCities(paginationQuery: PaginationQueryDto) {
    const { page, limit } = paginationQuery;
    const [results, total] = await this.cityRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['province'],
    });

    const pagination = generatePagination(page, limit, total);

    return {
      data: results,
      pagination: pagination,
    };
  }

  async getCityById(id: number) {
    return this.cityRepository.findOneByOrFail({ cityId: id });
  }

  async getCitiesByProvinceId(id: number, paginationQuery: PaginationQueryDto) {
    const { page, limit } = paginationQuery;
    const [results, total] = await this.cityRepository.findAndCount({
      where: { province: { provinceId: id } },
      relations: ['province'],
      skip: (page - 1) * limit,
      take: limit,
    });

    const pagination = generatePagination(page, limit, total);

    return {
      data: results,
      pagination: pagination,
    };
  }

  async getCitiesByRegionId(id: number, paginationQuery: PaginationQueryDto) {
    const { page, limit } = paginationQuery;
    const [results, total] = await this.cityRepository.findAndCount({
      where: { province: { region: { regionId: id } } },
      relations: ['province', 'province.region'],
      skip: (page - 1) * limit,
      take: limit,
    });

    const pagination = generatePagination(page, limit, total);

    return {
      data: results,
      pagination: pagination,
    };
  }
}
