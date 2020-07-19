import {
  Controller,
  Get,
  Param,
  Query,
  Put,
  Body,
  Post,
  Logger,
} from '@nestjs/common';
import { Workshop, Categories } from '../models/workshop.model';
import { ApiTags } from '@nestjs/swagger';
import { Locations, Offering } from '../models/offering.model';
import { WorkshopSearchDto, WorkshopCreateDto } from '../workshops.types';
import { BookingsService } from '../services/bookings.service';
import { WorkshopsService } from '../services/workshops.service';
import { BookingCreateDto, BookOfferingDto } from '../bookings.types';
import { Booking, BookingStatus } from '../models/booking.model';
import { get } from 'http';
import { CouponsService } from '../services/coupons.service';
import Stripe from 'stripe';
import { InjectStripe } from 'nestjs-stripe';
import { OfferingsService } from '../services/offerings.service';
import { mongoose } from '@typegoose/typegoose';
import { TransactionCreateDto } from '../transactions.types';
import { TransactionsService } from '../services/transactions.service';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
  constructor(
    public bookingService: BookingsService,
    public workshopsService: WorkshopsService,
    public couponsService: CouponsService,
    public offeringsService: OfferingsService,
    public transactionsService: TransactionsService,
    @InjectStripe() private readonly stripeClient: Stripe,
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
  async createBooking(@Body() req: BookOfferingDto): Promise<Booking | null > {
    const workshopId = String(req._workshop);
    const offeringId = String(req._offering);
    const requestedWorkshop = await this.workshopsService.findById(workshopId);
    const requstedOffering = await this.offeringsService.findById(offeringId);

    let resultOffering: Offering;
    for (const offering of requestedWorkshop.offerings) {
      if (
        offering.startDate.getTime() === requstedOffering.startDate.getTime() &&
        offering.endDate.getTime() === requstedOffering.endDate.getTime() &&
        offering.price === requstedOffering.price &&
        offering.location === requstedOffering.location &&
        offering.occupied === requstedOffering.occupied
      ) {
        resultOffering = offering;
      }
    }
    if (!resultOffering) {
      Logger.error('offer does not exist or does not belong to this workshop');
      return null;
      // TODO: throw an error 400
    }

    let price = resultOffering.price * 100;

    const coupon = await this.couponsService.findByCode(String(req._coupon));
    if(req._coupon){
      if (!coupon || String(coupon._workshop) !== workshopId) {
        Logger.error('Coupon Invalid');
        return null;
        // TODO: Throw error. 400
      }

      if (coupon) {
        const startDate = coupon.startDate.getTime();
        const endDate = coupon.endDate.getTime();
        const currentDate = Date.now();
        if (currentDate >= startDate && currentDate <= endDate) {
          price *= (100 - coupon.discount) / 100.0;
        }
      }
    }
    const transfer = await this.stripeClient.charges.create({
      amount: price,
      currency: 'eur',
      source: req.token, // TODO: get token from request
      description: 'Charge for coach-camp',
    });

    if (!transfer) {
      Logger.error('Transaction not processed.');
    }
    const transaction = {
      _instructor: requestedWorkshop._instructor,
      _student: null, // get auth user? or email?
      stripe_charge: transfer.id,
      amount: price,
      date: new Date(),
    } as TransactionCreateDto;

    const savedTransaction = await this.transactionsService.create(transaction);
    // @ts-ignore
    req._transaction = mongoose.Types.ObjectId(savedTransaction.id);
    // @ts-ignore
    let coupon_id = req._coupon?coupon.id:null;
    const booking = {
      _offering: req._offering,
      _workshop: req._workshop,
      _instructor: requestedWorkshop._instructor,
      _coupon: coupon_id,
      _transaction: req._transaction,
      status: BookingStatus.PENDING,
      date: new Date(),
      firstName: req.firstName,
      lastName: req.lastName,
      phoneNumber: req.phoneNumber,
      email: req.emailAddress,
      address: req.address,
      postCode: req.postCode,
      city: req.city,
    } as BookingCreateDto;

    const bookingCreated = await this.bookingService.create(booking);

    requstedOffering.occupied = requstedOffering.occupied + 1;
    this.offeringsService.update(offeringId, requstedOffering);
    // @ts-ignore
    const otherWorkshopOfferings = requestedWorkshop.offerings.filter(offering => offering.id !== offeringId);
    this.workshopsService.update(workshopId, {offerings: [...otherWorkshopOfferings, requstedOffering]})
    return bookingCreated;
  }
}
