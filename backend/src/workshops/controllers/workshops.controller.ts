import { Controller, Get, Param, Query, Put, Body, Post } from '@nestjs/common';
import { WorkshopsService } from '../services/workshops.service';
import { Workshop, Categories } from '../models/workshop.model';
import { ApiTags } from '@nestjs/swagger';
import { Locations, Offering } from '../models/offering.model';
import { WorkshopSearchDto, WorkshopCreateDto } from '../workshops.types';
import { OfferingsService } from '../services/offerings.service';
import { OfferingCreateDto } from '../offerings.types';
import { CouponsService } from '../services/coupons.service';

@ApiTags('Workshops')
@Controller('workshops')
export class WorkshopsController {
  constructor(
    public workshopService: WorkshopsService,
    public offeringsService: OfferingsService,
    public couponsService: CouponsService,
  ) {}

  @Get()
  async getWorkshops(
    @Query() workshopSearchDto: WorkshopSearchDto,
  ): Promise<Workshop[]> {
    return await this.workshopService.searchWorkshops(workshopSearchDto);
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
  async updateWorkshop(
    @Param('id') id: string,
    @Body() updatedWorkShop: WorkshopCreateDto,
  ): Promise<Workshop | null> {
    return await this.workshopService.update(id, updatedWorkShop);
  }

  @Put(':id/offering')
  async addOffering(
    @Param('id') id: string,
    @Body() createOffering: OfferingCreateDto,
  ): Promise<Workshop | null> {
    const currentWorkshop = await this.workshopService.findById(id);
    const offering = await this.offeringsService.create(createOffering); // should sub docs have Ids?
    let offerings: Offering[] = [];
    if (currentWorkshop.offerings) {
      currentWorkshop.offerings.push(offering);
      offerings = currentWorkshop.offerings;
    } else {
      offerings = [offering];
    }

    return await this.workshopService.update(id, { offerings });
  }

  @Post()
  async createWorkshop(
    @Body() updatedWorkShop: WorkshopCreateDto,
  ): Promise<Workshop | null> {
    return await this.workshopService.create(updatedWorkShop);
  }
}
