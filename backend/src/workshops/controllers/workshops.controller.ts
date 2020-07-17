import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards,} from '@nestjs/common';
import {WorkshopsService} from '../services/workshops.service';
import {Categories, Workshop} from '../models/workshop.model';
import {ApiTags} from '@nestjs/swagger';
import {Locations, Offering} from '../models/offering.model';
import {WorkshopCreateDto, WorkshopSearchDto} from '../workshops.types';
import {OfferingsService} from '../services/offerings.service';
import {OfferingCreateDto} from '../offerings.types';
import {CouponsService} from '../services/coupons.service';
import {InstructorAuth, InstructorLoggedIn, User,} from 'src/instructors/decorators/instructor.auth';
import {Instructor} from 'src/instructors/models/instructor.model';
import {AuthGuard} from '@nestjs/passport';

@ApiTags('Workshops')
@Controller('workshops')
export class WorkshopsController {
  constructor(
    public workshopService: WorkshopsService,
    public offeringsService: OfferingsService,
    public couponsService: CouponsService,
  ) {
  }

  @Get()
  async getWorkshops(
    @Query() workshopSearchDto: WorkshopSearchDto,
  ): Promise<Workshop[] | number> {
    return await this.workshopService.searchWorkshops(workshopSearchDto);
  }

  @Get('/count')
  async getWorkshopsCount(
    @Query() workshopSearchDto: WorkshopSearchDto,
  ): Promise<Workshop[] | number> {
    return await this.workshopService.searchWorkshops(workshopSearchDto, true);
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
    const offerings = updatedWorkShop.offerings;
    const updatedOfferings: Offering[] = [];

    if (offerings) {
      for (const offering of offerings) {
        // @ts-ignore
        const id = offering._id;
        if (id) {
          this.offeringsService.update(id, offering);
        } else {
          updatedOfferings.push(await this.offeringsService.create(offering));
        }
      }
    }
    updatedWorkShop.offerings = updatedOfferings;
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

  @InstructorLoggedIn()
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createWorkshop(
    @User() user: Instructor,
    @Body() updatedWorkShop: WorkshopCreateDto,
  ): Promise<Workshop | null> {
    const offerings = updatedWorkShop.offerings;
    updatedWorkShop.offerings = [];
    // @ts-ignore
    updatedWorkShop._instructor = user.id;
    const newWorkshop = await this.workshopService.create(updatedWorkShop);
    const createdOfferings = [];
    if (offerings) {
      for (const offering of offerings) {
        createdOfferings.push(await this.offeringsService.create(offering));
      }
    }
    // @ts-ignore
    const returnWorkshop = await this.workshopService.update(newWorkshop._id, {
      offerings: createdOfferings,
    });

    return returnWorkshop;
  }

  @Delete(':workshop_id')
  @InstructorAuth()
  async deleteWorkshop(
    @Param('workshop_id') workshopId: string,
  ): Promise<Workshop | null> {
    return await this.workshopService.deleteWorkshop(workshopId);
  }
}
