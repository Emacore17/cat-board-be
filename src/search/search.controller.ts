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
    summary: 'Ricerca località italiane come regioni, province o comuni',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 200, description: 'Success.' })
  async searchLocation(@Query() search: SearchLocationDto) {
    return this.searchService.searchLocation(search.query);
  }
}
