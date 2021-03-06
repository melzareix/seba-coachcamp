import { prop, plugin, pre, ModelOptions } from '@typegoose/typegoose';
import * as mhidden from 'mongoose-hidden';
import * as bcrypt from 'bcryptjs';
import { compareHash } from '../../common/utils';
import { ObjectId } from 'mongodb';

@plugin(mhidden())
@pre<Instructor>('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
})
@ModelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
export class Instructor {
  _id?: ObjectId;

  @prop({ required: true })
  name: string;

  @prop({ required: true, unique: true })
  email: string;

  @prop({ required: true, hide: true })
  password: string;

  @prop({ required: true })
  description: string;

  @prop({ required: true })
  phone: string;

  @prop({ default: false })
  _deleted?: boolean;

  async checkPassword(password: string): Promise<boolean> {
    return await compareHash(password, this.password);
  }
}
