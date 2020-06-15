import { prop, plugin } from '@typegoose/typegoose';
import * as mhidden from 'mongoose-hidden';

@plugin(mhidden())
export class Instructor {
  @prop({ required: true })
  name: string;

  @prop({ required: true })
  email: string;

  @prop({ required: true, hide: true })
  password: string;

  @prop({ required: true })
  description: string;

  @prop({ required: true })
  phone: string;

  @prop({ default: false })
  _deleted?: boolean;
}
