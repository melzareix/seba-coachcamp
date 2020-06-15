import { prop, Ref, index, arrayProp } from '@typegoose/typegoose';
import { Instructor } from 'src/instructors/models/instructor.model';
import { Review } from './review.model';
import { Offering } from './offering.model';

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
})
export class Workshop {
  @prop({ required: true })
  name: string;

  @prop({ required: true })
  description: string;

  @prop({ enum: Categories })
  category: Categories;

  @prop({ required: true, ref: Instructor })
  _instructor: Ref<Instructor>;

  @arrayProp({ items: Offering })
  offerings: Offering[];

  @arrayProp({ default: [], items: String })
  gallery?: string[];

  @arrayProp({ ref: 'Review', default: [] })
  reviews?: Ref<Review>[];

  @prop({ default: false })
  _deleted?: boolean;
}
