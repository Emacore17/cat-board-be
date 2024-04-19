import { Controller, Get, Param, Query } from '@nestjs/common';
import { CityService } from './city.service';
import { PaginationQueryDto } from 'src/dto/pagination-query.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @ApiOperation({
    summary: 'Return all italian cities',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful retrieval of the cities',
  })
  @Get()
  async getAllCities(@Query() paginationQuery: PaginationQueryDto) {
    return this.cityService.getAllCities(paginationQuery);
  }

  @ApiOperation({
    summary: 'Return city by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful retrieval of the city',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'Unique identifier of the city in the database.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Possibly due to invalid format of the ID.',
  })
  @ApiResponse({
    status: 404,
    description: 'No city found for the provided ID.',
  })
  @Get('/:id')
  async getCityById(@Param('id') id: number) {
    return await this.cityService.getCityById(id);
  }

  @ApiOperation({
    summary: 'Return city by province id',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful retrieval of the cities',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'Unique identifier of the province in the database.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Possibly due to invalid format of the ID.',
  })
  @Get('/province/:id')
  async getCitiesByProvinceId(@Param('id') id: number, @Query() paginationQuery: PaginationQueryDto) {
    return await this.cityService.getCitiesByProvinceId(id, paginationQuery);
  }

  @ApiOperation({
    summary: 'Return city by region id',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful retrieval of the cities',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'Unique identifier of the region in the database.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Possibly due to invalid format of the ID.',
  })
  @Get('/region/:id')
  async getCitiesByRegionId(@Param('id') id: number, @Query() paginationQuery: PaginationQueryDto) {
    return await this.cityService.getCitiesByRegionId(id, paginationQuery);
  }
}
