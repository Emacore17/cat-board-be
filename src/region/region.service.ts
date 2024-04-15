import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from 'src/database/entities/region.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(Region) private regionRepository: Repository<Region>,
  ) {}

  async getAllRegions() {
    return await this.regionRepository.find();
  }

  async getRegionById(id: number) {
    return await this.regionRepository.findOneByOrFail({ regionId: id });
  }
}
