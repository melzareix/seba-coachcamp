import { prop, Ref } from '@typegoose/typegoose';
import { Workshop } from 'src/workshops/models/workshop.model';

export class Review {
  @prop({ ref: 'Workshop' })
  _workshop: Ref<Workshop>;

  @prop({required: true })
  rating: number;

  @prop()
  description: string;
  @prop({ required: true })
  email: string;
  @prop({})
  name: string;

  @prop({ default: 0 })
  reports: number;

  @prop({ default: false })
  _deleted?: boolean;
}
