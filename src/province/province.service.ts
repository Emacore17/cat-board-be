import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Province } from 'src/database/entities/province.entity';
import { PaginationQueryDto } from 'src/dto/pagination-query.dto';
import { generatePagination } from 'src/utils/generatePagination';
import { Repository } from 'typeorm';

@Injectable()
export class ProvinceService {
  constructor(
    @InjectRepository(Province)
    private provinceRepository: Repository<Province>,
  ) {}

  async getAllProvinces(paginationQuery: PaginationQueryDto) {
    const { page, limit } = paginationQuery;
    const [results, total] = await this.provinceRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    const pagination = generatePagination(page, limit, total);

    return {
      data: results,
      pagination: pagination,
    };
  }

  async getProvinceById(id: number) {
    return await this.provinceRepository.findOneByOrFail({ provinceId: id });
  }

  async getProvincesByRegionId(id: number) {
    return await this.provinceRepository.find({ where: { region: {regionId: id} }, relations: ["region"] });
  }
}
