import { Controller, Get, Param, Query, Put, Body, Post, Logger } from '@nestjs/common';
import { Workshop, Categories } from '../models/workshop.model';
import { ApiTags } from '@nestjs/swagger';
import { Locations, Offering } from '../models/offering.model';
import { WorkshopSearchDto, WorkshopCreateDto, offringWithId } from '../workshops.types';
import { BookingsService } from '../services/bookings.service';
import { WorkshopsService } from '../services/workshops.service';
import { BookingCreateDto } from '../bookings.types';
import { Booking } from '../models/booking.model';
import { get } from 'http';
import { CouponsService } from '../services/coupons.service';
import Stripe from 'stripe';
import { InjectStripe } from 'nestjs-stripe';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
  constructor(public bookingService: BookingsService, public workshopsService: WorkshopsService,
    public couponsService: CouponsService,
    @InjectStripe() private readonly stripeClient: Stripe
    ) {}


// you book an offering,
// 1. make sure workshop exists
// 2. check offerings list for that work shop.
// if offering exists proceed.
// 3. check if coupon exists. (apply if it does)
// 4. process transaction via stripe.
// 5.save the transaction
// 6. save the booking
  @Post('')
  async createWorkshop(@Body() createBooking: BookingCreateDto): Promise< Booking | null> {
      const workshop = await this.workshopsService.findById(String(createBooking._workshop));
      console.log(new Date());

      let resultOffering: Offering;
      // TODO: check offering in workshop
      if (!resultOffering) {
          Logger.error("offer does not exist or does not belong to this workshop");
          // TODO: throw an error
      }

      const coupon = await this.couponsService.findById(String(createBooking._coupon));

      if (!coupon || coupon._workshop !== createBooking._workshop) {
          Logger.error("Coupon Invalid");
          return null;
          // TODO: Throw error.
      }
      let price = resultOffering.price * 100;

      if (coupon) {
        const startDate = coupon.startDate.getTime();
        const endDate = coupon.endDate.getTime();
        const currentDate = Date.now();
        if (currentDate >= startDate && currentDate <= endDate) {
          price *= ((100 - coupon.discount) / 100.0);
        }
      }

    const transfer = await this.stripeClient.charges.create({
        amount: price,
        currency: 'eur',
        source: "get token from req", // TODO: get token from request
        description: 'Charge for coach-camp',
      });

    return await this.bookingService.create(createBooking);
  }

}
