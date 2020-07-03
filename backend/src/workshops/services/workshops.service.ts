import { Injectable } from '@nestjs/common';
import { Workshop } from '../models/workshop.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import {
  WorkshopSearchDto,
  WorkshopCreateDto,
  WorkshopUpdateDto,
} from '../workshops.types';

@Injectable()
export class WorkshopsService {
  constructor(
    @InjectModel(Workshop)
    private readonly workshopModel: ReturnModelType<typeof Workshop>,
  ) {}

  async create(workshop: WorkshopCreateDto): Promise<Workshop> {
    return await this.workshopModel.create(workshop);
  }

  async update(id: string, workshop: WorkshopUpdateDto): Promise<Workshop> {
    return await this.workshopModel.findByIdAndUpdate(id, workshop);
  }

  async findAll(): Promise<Workshop[]> {
    return await this.workshopModel.find().exec();
  }

  async findById(id: string): Promise<Workshop | null> {
    return await this.workshopModel.findById(id).populate('_instructor');
  }

  async findInstructorWorkshops(
    instructorId: string,
  ): Promise<Workshop[] | null> {
    return this.workshopModel.find({
      _instructor: instructorId,
    });
  }

  async searchWorkshops(searchDto: WorkshopSearchDto): Promise<Workshop[]> {
    const query = {};
    if (searchDto.text) {
      query['$text'] = {
        $search: searchDto.text,
        $caseSensitive: true,
      };
    }

    if (searchDto.location) {
      query['offerings'] = {
        $elemMatch: {
          location: searchDto.location,
        },
      };
    }

    if (searchDto.category) {
      query['category'] = searchDto.category;
    }

    return await this.workshopModel.find(query);
  }
}
