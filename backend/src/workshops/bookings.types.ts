import { ObjectId } from 'mongodb';
import { BookingStatus } from './models/booking.model';

export class BookingCreateDto {
  _offering: ObjectId;
  _workshop: ObjectId;
  _instructor: ObjectId;
  _coupon: ObjectId | null;
  _transaction: ObjectId;
  status: BookingStatus;
  date: Date;
  address: string;
  postCode: string;
  city: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
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
  firstName: string;
  lastName: string;
  address: string;
  postCode: string;
  city: string;
  phoneNumber: string;
  emailAddress: string;
}

export type StudentInfo = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  bookingId: string;
};
