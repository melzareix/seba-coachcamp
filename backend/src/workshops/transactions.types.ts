import { ObjectId } from 'mongodb';
import { TransactionStatus } from './models/transaction.model';

export class TransactionCreateDto {
  _instructor: ObjectId;
  _student: ObjectId;
  stripe_charge: string;
  amount: number;
  status?: TransactionStatus;
  date: Date;
}
