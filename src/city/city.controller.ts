import { Controller, Get, Query } from '@nestjs/common';
import { CityService } from './city.service';
import { PaginationQueryDto } from 'src/dto/pagination-query.dto';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async getAllCities(@Query() paginationQuery: PaginationQueryDto) {
    return this.cityService.getAllCities(paginationQuery);
  }
}
