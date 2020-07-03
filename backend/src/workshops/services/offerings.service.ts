import { Injectable } from '@nestjs/common';
import { Offering } from '../models/offering.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { OfferingCreateDto } from '../offerings.types';

@Injectable()
export class OfferingsService {
  constructor(
    @InjectModel(Offering)
    private readonly offeringModel: ReturnModelType<typeof Offering>,
  ) {}

  async findById(id: string): Promise<Offering> {
    return await this.offeringModel.findById(id);
  }

  async create(createoffering: OfferingCreateDto): Promise<Offering> {
    return await this.offeringModel.create(createoffering);
  }
}
