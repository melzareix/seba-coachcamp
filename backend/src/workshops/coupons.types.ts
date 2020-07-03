import { ObjectId } from 'mongodb';

export class CouponCreateDto {
  _workshop: ObjectId;
  startDate: Date;
  endDate: Date;
  code: string;
  discount: number;
}
