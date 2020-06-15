import { prop } from '@typegoose/typegoose';

export enum StudentStatus {
  UNCONFIRMED = 'Unconfirmed',
  CONFIRMED = 'Confirmed',
  BANNED = 'Banned',
}

export class Student {
  @prop({ required: true })
  email: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true })
  firstName: string;

  @prop({ required: true })
  lastName: string;

  @prop({ required: true })
  mobile: string;

  @prop()
  birthDate: Date;

  @prop({ enum: StudentStatus, default: StudentStatus.UNCONFIRMED })
  status: StudentStatus;

  @prop({ default: false })
  _deleted: boolean;
}
