import {
  prop,
  Ref,
  index,
  arrayProp,
  ModelOptions,
} from '@typegoose/typegoose';
import { Instructor } from 'src/instructors/models/instructor.model';
import { Review } from './review.model';
import { Offering } from './offering.model';
import { ObjectId } from 'mongodb';

export enum Categories {
  COMMUNICATIONS = 'Communications',
  CREATIVITY = 'Creativity',
  TEAMWORk = 'TeamWork',
  EMOTIONALINTELLIGENCE = 'Emotional-Intelligence',
  ADAPTABILITY = 'Adaptability',
  LEADERSHIP = 'Leadership',
  PROBLEM_SOLVING = 'Problem-solving',
}

@index({
  name: 'text',
  description: 'text',
  lowercase: true,
})
@ModelOptions({
  schemaOptions: {
    toObject: { virtuals: true },
  },
})
export class Workshop {
  _id?: ObjectId;

  @prop({ required: true })
  name: string;

  @prop({ required: true })
  description: string;

  @prop({ enum: Categories })
  category: Categories;

  @prop({ required: false, ref: Instructor })
  _instructor?: Ref<Instructor>;

  @arrayProp({ items: Offering })
  offerings: Offering[];

  @arrayProp({ default: [], items: String })
  gallery?: string[];

  @arrayProp({ ref: 'Review', default: [] })
  reviews?: Ref<Review>[];

  @prop({ default: false })
  _deleted?: boolean;
}
