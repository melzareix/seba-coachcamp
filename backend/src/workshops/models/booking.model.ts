import { prop, Ref } from '@typegoose/typegoose';
import { Workshop } from './workshop.model';
import { Instructor } from 'src/instructors/models/instructor.model';
import { Coupon } from './coupon.model';
import { Transaction } from './transaction.model';
import { Offering } from './offering.model';

export enum BookingStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  REJECTED = 'Rejected',
}

export class Booking {
  @prop({ required: true, ref: 'Workshop' })
  _workshop: Ref<Workshop>;

  @prop({ required: true, ref: 'Offering' })
  _offering: Ref<Offering>;

  @prop({ ref: 'Instructor' })
  _instructor: Ref<Instructor>;

  @prop({ ref: 'Coupon' })
  _coupon: Ref<Coupon>;

  @prop({ ref: 'Transaction' })
  _transaction: Ref<Transaction>;

  @prop({ default: BookingStatus.PENDING, enum: BookingStatus })
  status: BookingStatus;

  @prop() date: Date;

  @prop() firstName: string;

  @prop() lastName: string;

  @prop() address: string;

  @prop() postCode: string;

  @prop() city: string;

  @prop() phoneNumber: string;

  @prop() email: string;

  @prop({ default: false })
  _deleted?: boolean;
}
