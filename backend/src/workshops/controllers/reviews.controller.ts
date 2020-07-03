import { Controller, Get, Param, Query, Put, Body, Post } from '@nestjs/common';
import { ReviewsService } from '../services/reviews.service';
import { Review } from '../models/review.model';
import { ReviewCreateDto } from '../reviews.types';
@Controller('reviews')
export class ReviewsController {
  constructor(public reviewsService: ReviewsService) {}


  @Get('/')
  async getPaginatedWorkshops(@Param('skip') skip: string,@Param('limit') limit: string): Promise<Workshop[]> {
    return await this.workshopService.findPaginated(parseInt(skip),parseInt(limit));
  }
 
  @Get(':id')
  async getReview(@Param('id') id: string): Promise<Review | null> {
    return await this.reviewsService.findById(id);
  }

  @Put(':instructorId')
  async updateWorkshop(@Param('id') id: string, @Body() updatedWorkShop: WorkshopCreateDto): Promise< Workshop | null> {
    return await this.workshopService.update(id, updatedWorkShop)
  }

  @Put(':id')
  async updateReview(@Param('id') id: string, @Body() updatedReview: ReviewCreateDto): Promise< Review | null> {
    return await this.reviewsService.update(id, updatedReview)
  }

  @Post()
  async createReview(@Body() createReview: ReviewCreateDto): Promise< Review | null> {
    return await this.reviewsService.create(createReview)
  }
}
