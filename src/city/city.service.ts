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
      relations: ["province"]
    });

    const pagination = generatePagination(page, limit, total);

    return {
      data: results,
      pagination: pagination,
    };
  }
}
