import { ObjectId } from 'mongodb';


export class ReviewCreateDto {
  rating: number;
  description: string;
  reports: number;
  _instructor: ObjectId;
}
