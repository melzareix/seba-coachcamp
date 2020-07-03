import { Locations } from './models/offering.model';

export class OfferingCreateDto {
  price: number;
  startDate: Date;
  endDate: Date;
  location: Locations;
  address: string;
  capacity: number;
  occupied: number;
}
