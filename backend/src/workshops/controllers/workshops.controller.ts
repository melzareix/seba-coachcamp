import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { WorkshopsService } from '../services/workshops.service';
import { Categories, Workshop } from '../models/workshop.model';
import { ApiTags } from '@nestjs/swagger';
import { Locations, Offering } from '../models/offering.model';
import { WorkshopCreateDto, WorkshopSearchDto } from '../workshops.types';
import { OfferingsService } from '../services/offerings.service';
import { OfferingCreateDto } from '../offerings.types';
import { CouponsService } from '../services/coupons.service';
import {
  InstructorAuth,
  InstructorLoggedIn,
  User,
} from 'src/instructors/decorators/instructor.auth';
import { Instructor } from 'src/instructors/models/instructor.model';
import { AuthGuard } from '@nestjs/passport';
import * as moment from 'moment';
import { ReviewsService } from '../services/reviews.service';
import { Review } from '../models/review.model';
import { ReviewCreateDto } from '../reviews.types';

@ApiTags('Workshops')
@Controller('workshops')
export class WorkshopsController {
  constructor(
    public workshopService: WorkshopsService,
    public offeringsService: OfferingsService,
    public couponsService: CouponsService,
    public reviewsService: ReviewsService
  ) {}

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

    //@ts-ignore
    updatedWorkShop.gallery = updatedWorkShop.gallery.trim().split('\n');

    if (offerings) {
      for (const offering of offerings) {
        // @ts-ignore
        const id = offering._id;
        const startDate = moment(offering.startDate, 'DD-MM-YYYY');
        offering.startDate = startDate.toDate();

        const endDate = moment(offering.endDate, 'DD-MM-YYYY');
        offering.endDate = endDate.toDate();

        if (id) {
          this.offeringsService.update(id, offering);
        } else {
          offering.occupied = 0;
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

    //@ts-ignore
    const gallery = updatedWorkShop.gallery.trim().split('\n');

    if (offerings) {
      for (const offering of offerings) {
        const startDate = moment(offering.startDate, 'DD-MM-YYYY');
        offering.startDate = startDate.toDate();
        offering.occupied = 0;

        const endDate = moment(offering.endDate, 'DD-MM-YYYY');
        offering.endDate = endDate.toDate();
        updatedWorkShop.offerings = createdOfferings;

        createdOfferings.push(await this.offeringsService.create(offering));
      }
    }
    // @ts-ignore
    return await this.workshopService.update(newWorkshop._id, {
      offerings: createdOfferings,
      gallery,
    });
  }

  @Delete(':workshop_id')
  @InstructorAuth()
  async deleteWorkshop(
    @Param('workshop_id') workshopId: string,
  ): Promise<Workshop | null> {
    return await this.workshopService.deleteWorkshop(workshopId);
  }

  @Post(':id/reviews')
  async createReview(@Body() createReview: ReviewCreateDto): Promise< Review | null> {
    return await this.reviewsService.create(createReview)
  }
  @Get(':id/reviews')
  async getReviews(@Param('id') id: string): Promise<Review[] | null> {
    return await this.reviewsService.findReviewsForWorkshop(id);
  }
}
