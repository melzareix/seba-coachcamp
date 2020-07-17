import { Injectable } from '@nestjs/common';
import { Workshop } from '../models/workshop.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import {
  WorkshopCreateDto,
  WorkshopSearchDto,
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
    return this.workshopModel.findByIdAndUpdate(id, workshop);
  }

  async findById(id: string): Promise<Workshop | null> {
    return this.workshopModel
      .findOne({ _id: id, _deleted: false })
      .populate('_instructor');
  }

  async findInstructorWorkshops(
    instructorId: string,
  ): Promise<Workshop[] | null> {
    return this.workshopModel.find({
      _instructor: instructorId,
      _deleted: false,
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

    if (isCount) return this.workshopModel.count({ ...query, _deleted: false });
    const skip = parseInt(searchDto.skip, 0) || 0;
    const limit = parseInt(searchDto.limit, 0) || 9;
    return this.workshopModel
      .find({ ...query, _deleted: false })
      .skip(skip)
      .limit(limit);
  }

  async deleteWorkshop(workshopId: string): Promise<Workshop> {
    return this.workshopModel.findByIdAndUpdate(
      workshopId,
      { _deleted: true },
      { new: true },
    );
  }
}
