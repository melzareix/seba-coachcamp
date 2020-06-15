import { prop, Ref } from '@typegoose/typegoose';
import { Instructor } from 'src/instructors/models/instructor.model';

export class Review {
  @prop({ ref: 'Instructor' })
  _instructor: Ref<Instructor>;

  @prop({ default: 0 })
  rating: number;

  @prop({ required: true })
  description: string;

  @prop({ default: 0 })
  reports: number;

  @prop({ default: false })
  _deleted: boolean;
}
