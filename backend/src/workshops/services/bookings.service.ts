import { Booking } from '../models/booking.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { BookingCreateDto } from '../bookings.types';

@Injectable()
export class BookingsService {
    constructor(
        @InjectModel(Booking)
        private readonly bookingModel: ReturnModelType<typeof Booking>,
      ) {}

    async create(booking: BookingCreateDto): Promise<Booking> {
      return await this.bookingModel.create(booking);
    }

    async update(id: string, booking: BookingCreateDto): Promise<Booking> {
        return await this.bookingModel.findByIdAndUpdate(id, booking);
    }

    async findById(id: string): Promise<Booking> {
        return await this.bookingModel.findById(id)
    }

}
