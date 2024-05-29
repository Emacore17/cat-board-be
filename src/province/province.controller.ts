import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/dto/pagination-query.dto';
import { ProvinceService } from './province.service';

@ApiTags('Provinces')
@Controller('provinces')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  // TODO: ApiOkResponse in swagger

  @ApiOperation({
    summary: 'Return all italian provinces',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful retrieval of the provinces',
  })
  @Get()
  async getAllProvince(@Query() paginationQuery: PaginationQueryDto) {
    return await this.provinceService.getAllProvinces(paginationQuery);
  }

  @ApiOperation({
    summary: 'Return province by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful retrieval of the provinces',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Possibly due to invalid format of the ID.',
  })
  @ApiResponse({
    status: 404,
    description: 'No province found for the provided ID.',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'Unique identifier of the province in the database.',
  })
  @Get('/:id')
  async getProvinceById(@Param('id') id: number) {
    return await this.provinceService.getProvinceById(id);
  }


  @ApiOperation({
    summary: 'Return province by region id',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful retrieval of the provinces',
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
  async getProvincesByRegionId(@Param('id') id: number) {
    return await this.provinceService.getProvincesByRegionId(id);
  }
}
