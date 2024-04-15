import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchLocationDto } from './dto/search-location.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('/location')
  @ApiOperation({
    summary: 'Ricerca località italiane',
    description: 'Ricerca di comuni, province e/o regioni italiane'
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 200, description: 'Return locations with limit of 10' })
  async searchLocation(@Query() search: SearchLocationDto) {
    return this.searchService.searchLocation(search.query);
  }
}
