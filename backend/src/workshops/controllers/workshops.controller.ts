import { Controller, Get, Param, Query, Put, Body, Post } from '@nestjs/common';
import { WorkshopsService } from '../services/workshops.service';
import { Workshop, Categories } from '../models/workshop.model';
import { ApiTags } from '@nestjs/swagger';
import { Locations } from '../models/offering.model';
import { WorkshopSearchDto, WorkshopCreateDto } from '../workshops.types';
@ApiTags('Workshops')
@Controller('workshops')
export class WorkshopsController {
  constructor(public workshopService: WorkshopsService) {}

  @Get()
  async getWorkshops(
    @Query() workshopSearchDto: WorkshopSearchDto,
  ): Promise<Workshop[]> {
    return await this.workshopService.searchWorkshops(workshopSearchDto);
  }

  @Get('paginated/:skip/:limit')
  async getPaginatedWorkshops(@Param('skip') skip: string,@Param('limit') limit: string): Promise<Workshop[]> {
    return await this.workshopService.findPaginated(parseInt(skip),parseInt(limit));
  }
 
  @Get('categories')
  getCategories(): Categories[] {
    return Object.values(Categories);
  }

  @Get('locations')
  getLocations(): Locations[] {
    return Object.values(Locations);
  }

  @Get(':id')
  async getWorkshop(@Param('id') id: string): Promise<Workshop | null> {
    return await this.workshopService.findById(id);
  }

  @Put(':id')
  async updateWorkshop(@Param('id') id: string, @Body() updatedWorkShop: WorkshopCreateDto): Promise< Workshop | null> {
    return await this.workshopService.update(id, updatedWorkShop)
  }

  @Post()
  async createWorkshop(@Body() updatedWorkShop: WorkshopCreateDto): Promise< Workshop | null> {
    return await this.workshopService.create(updatedWorkShop)
  }
}
