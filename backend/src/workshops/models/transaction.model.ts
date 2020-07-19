import { prop, Ref } from '@typegoose/typegoose';
import { Instructor } from 'src/instructors/models/instructor.model';

export enum TransactionStatus {
  CLEARED = 'Cleared',
  REFUNDED = 'Refunded',
}

export class Transaction {
  @prop({ ref: 'Instructor' })
  _instructor: Ref<Instructor>;

  @prop({ required: true })
  stripe_charge: string;

  @prop({ required: true })
  amount: number;

  @prop({ default: TransactionStatus.CLEARED, enum: TransactionStatus })
  status?: TransactionStatus;

  @prop() date: Date;

  @prop({ default: false })
  _deleted?: boolean;
}
