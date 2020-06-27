import { Module } from '@nestjs/common';
import { WorkshopsService } from './services/workshops.service';
import { WorkshopsController } from './controllers/workshops.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Workshop } from './models/workshop.model';
import { CommandModule } from 'nestjs-command';
import { BookingsController } from './controllers/bookings.controller';
import { BookingsService } from './services/bookings.service';
import { OfferingsService } from './services/offerings.service';
import { Booking } from './models/booking.model';
import { Offering } from './models/offering.model';
import { Coupon } from './models/coupon.model';
import { CouponsService } from './services/coupons.service';
import { CouponsController } from './controllers/coupons.controller';

@Module({
  imports: [
    CommandModule,
    TypegooseModule.forFeature([Workshop, Booking, Offering, Coupon]),
  ],
  providers: [
    WorkshopsService,
    BookingsService,
    OfferingsService,
    CouponsService,
  ],
  controllers: [WorkshopsController, BookingsController, CouponsController],
  exports: [
    WorkshopsService,
    BookingsService,
    OfferingsService,
    CouponsService,
  ],
})
export class WorkshopsModule {}
