import { prop, Ref } from '@typegoose/typegoose';
import { Workshop } from './workshop.model';

export class Coupon {
  @prop({ required: true, ref: 'Workshop' })
  _workshop: Ref<Workshop>;

  @prop({ required: true })
  startDate: Date;

  @prop({ required: true })
  endDate: Date;

  @prop({ required: true })
  code: string;

  @prop({ required: true })
  discount: number;

  @prop({ default: false })
  _deleted?: boolean;
}
