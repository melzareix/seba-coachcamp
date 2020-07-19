import { prop } from '@typegoose/typegoose';

export enum Locations {
  MUNICH = 'Munich',
  STUTTGART = 'Stuttgart',
  TORONTO = 'Toronto',
  NEWYORK = 'New York',
  CAIRO = 'Cairo',
}

export class Offering {
  @prop() price: number;

  @prop({ required: true })
  startDate: Date;

  @prop({ required: true })
  endDate: Date;

  @prop({ enum: Locations })
  location: Locations;

  @prop() address: string;

  @prop() capacity: number;

  @prop() occupied: number;
}
