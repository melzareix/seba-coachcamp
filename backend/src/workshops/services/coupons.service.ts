import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Coupon } from '../models/coupon.model';
import { CouponCreateDto } from '../coupons.types';

@Injectable()
export class CouponsService {
  constructor(
    @InjectModel(Coupon)
    private readonly couponModel: ReturnModelType<typeof Coupon>,
  ) {}

  async findById(id: string): Promise<Coupon> {
    return await this.couponModel.findById(id);
  }
  async findByCode(code: string): Promise<Coupon> {
    return await this.couponModel.findOne({"code":code});
  }

  async create(createCoupon: CouponCreateDto): Promise<Coupon> {
    return await this.couponModel.create(createCoupon);
  }
}
