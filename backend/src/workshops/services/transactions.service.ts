import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Coupon } from '../models/coupon.model';
import { Transaction } from '../models/transaction.model';
import { TransactionCreateDto } from '../transactions.types';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction)
    private readonly transactionModel: ReturnModelType<typeof Transaction>,
  ) {}

  async create(createTransaction: TransactionCreateDto): Promise<Transaction> {
    return await this.transactionModel.create(createTransaction);
  }
}
