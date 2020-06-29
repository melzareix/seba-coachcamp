import { Module } from '@nestjs/common';
import { WorkshopsService } from './services/workshops.service';
import { ReviewsService } from './services/reviews.service';
import { WorkshopsController } from './controllers/workshops.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Workshop } from './models/workshop.model';
import {Review} from './models/review.model'
import { CommandModule } from 'nestjs-command';

@Module({
  imports: [CommandModule, TypegooseModule.forFeature([Workshop,Review])],
  providers: [WorkshopsService,ReviewsService],
  controllers: [WorkshopsController],
  exports: [WorkshopsService,ReviewsService],
})
export class WorkshopsModule {}
