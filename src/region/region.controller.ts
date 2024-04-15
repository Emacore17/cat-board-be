import { Controller, Get, Param } from '@nestjs/common';
import { RegionService } from './region.service';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Regions')
@Controller('regions')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  // TODO: ApiOkResponse in swagger
  
  @ApiOperation({
    summary: 'Return all italian regions',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful retrieval of the regions',
  })
  @Get()
  async getAllRegions() {
    return await this.regionService.getAllRegions();
  }

  @ApiOperation({
    summary: 'Return an Italian region by ID',
    description:
      'Retrieve detailed information about an Italian region based on its ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful retrieval of the region',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Possibly due to invalid format of the ID.',
  })
  @ApiResponse({
    status: 404,
    description: 'No region found for the provided ID.',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'Unique identifier of the region in the database.',
  })
  @Get('/:id')
  async getRegionById(@Param('id') id: number) {
    return await this.regionService.getRegionById(id);
  }
}
