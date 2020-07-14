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

  async getWorkshopsCount(): Promise<number> {
    return await this.workshopModel.count({});
  }
  async findPaginated(skip: number, limit: number): Promise<Workshop[]> {
    return await this.workshopModel
      .find()
      .skip(skip)
      .limit(limit)
      .exec();
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

  async searchWorkshops(
    searchDto: WorkshopSearchDto,
    isCount = false,
  ): Promise<Workshop[] | number> {
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

    if (isCount) return await this.workshopModel.count(query);
    const skip = parseInt(searchDto.skip, 0) || 0;
    const limit = parseInt(searchDto.limit, 0) || 9;
    return await this.workshopModel
      .find(query)
      .skip(skip)
      .limit(limit);
  }

  async deleteWorkshop(workshopId: string): Promise<Workshop> {
    return await this.workshopModel.findOneAndDelete({ id: workshopId });
  }
}
