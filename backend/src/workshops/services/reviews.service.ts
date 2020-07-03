import { Injectable } from '@nestjs/common';
import { Review } from '../models/review.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ReviewCreateDto } from '../reviews.types';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review)
    private readonly reviewModel: ReturnModelType<typeof Review>,
  ) {}

  async create(review: ReviewCreateDto): Promise<Review> {
    return await this.reviewModel.create(review);
  }

  async update(id: string, review: ReviewCreateDto): Promise<Review> {
    return await this.reviewModel.findByIdAndUpdate(id, review);
  }

  async findAll(): Promise<Review[]> {
    return await this.reviewModel.find().exec();
  }
  async findById(id: string): Promise<Review | null> {
    return await this.reviewModel.findById(id);
  }
  async findReviewsForInstructor(instructorId: string): Promise<Review[]> {
    return await this.reviewModel.find({"instructor":instructorId});
  }


}
