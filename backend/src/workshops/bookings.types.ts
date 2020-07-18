import { ObjectId } from 'mongodb';
import { BookingStatus } from './models/booking.model';

export class BookingCreateDto {
  _offering: ObjectId;
  _workshop: ObjectId;
  _instructor: ObjectId;
  _coupon: ObjectId|null
  _transaction: ObjectId;
  status: BookingStatus;
  date: Date;
}

export class BookOfferingDto {
  _offering: ObjectId;
  _workshop: ObjectId;
  _instructor: ObjectId;
  _coupon: string;
  _transaction: ObjectId;
  status: BookingStatus;
  date: Date;
  token: string;
}
