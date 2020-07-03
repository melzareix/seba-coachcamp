import { Module } from '@nestjs/common';
import { WorkshopsService } from './services/workshops.service';
import { ReviewsService } from './services/reviews.service';
import { WorkshopsController } from './controllers/workshops.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Workshop } from './models/workshop.model';
import { Review } from './models/review.model';
import { CommandModule } from 'nestjs-command';
import { BookingsController } from './controllers/bookings.controller';
import { BookingsService } from './services/bookings.service';
import { OfferingsService } from './services/offerings.service';
import { Booking } from './models/booking.model';
import { Offering } from './models/offering.model';
import { Coupon } from './models/coupon.model';
import { CouponsService } from './services/coupons.service';
import { CouponsController } from './controllers/coupons.controller';
import { Transaction } from './models/transaction.model';
import { TransactionsService } from './services/transactions.service';

@Module({
  imports: [
    CommandModule,
    TypegooseModule.forFeature([
      Workshop,
      Booking,
      Offering,
      Coupon,
      Transaction,
      Review,
    ]),
  ],
  providers: [
    WorkshopsService,
    BookingsService,
    OfferingsService,
    CouponsService,
    TransactionsService,
    ReviewsService,
  ],
  controllers: [WorkshopsController, BookingsController, CouponsController],
  exports: [
    WorkshopsService,
    BookingsService,
    OfferingsService,
    CouponsService,
    TransactionsService,
    ReviewsService,
  ],
})
export class WorkshopsModule {}
