import { Locations, Offering } from './models/offering.model';
import { Categories } from './models/workshop.model';
import { ObjectId } from 'mongodb';

export class WorkshopSearchDto {
  text?: string;
  location?: Locations;
  category?: Categories;
}

export class WorkshopCreateDto {
  name: string;
  description: string;
  category: Categories;
  _instructor: ObjectId;
  offerings: Offering[];
  gallery: string[];
}
