import { ObjectId } from 'mongodb';

export class ReviewCreateDto {
  rating: number;
  description: string;
  reports: number;
  email: string;
  name: string;
  _workshop: ObjectId;
}
