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
  TEAMWORK = 'TeamWork',
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
    toJSON: {virtuals: true}
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

  @arrayProp({ items: Review, default: [] })
  reviews?: Review[];

  get rating() {
    const reviewCount = this.reviews.length;
    if (reviewCount === 0) {
      return 0;
    }
    const sumRating = this.reviews.reduce((acc, review) => review.rating + acc, 0);
    return Math.round(sumRating / reviewCount);
  }

  @prop({ default: false })
  _deleted?: boolean;
}
