import { Controller, Get, Param, Query, Put, Body, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CouponCreateDto } from '../coupons.types';
import { CouponsService } from '../services/coupons.service';
import { Coupon } from '../models/coupon.model';

@ApiTags('Coupons')
@Controller('coupons')
export class CouponsController {
  constructor(public couponsService: CouponsService) {}

  @Post()
  async addCoupon(
    @Param('id') id: string,
    @Body() createCoupon: CouponCreateDto,
  ): Promise<Coupon | null> {
    return await this.couponsService.create(createCoupon);
  }
}
