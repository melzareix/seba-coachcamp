import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { WorkshopsService } from '../services/workshops.service';
import { ReviewsService } from '../services/reviews.service';
import { Categories } from '../models/workshop.model';
import { ObjectId } from 'mongodb';
import * as faker from 'faker';
import { instructorIds, workshopLocs } from 'src/seeds/constants';

@Injectable()
export class WorkshopsSeed {
  constructor(private readonly workshopsService: WorkshopsService,private readonly reviewsService: ReviewsService) {}

  @Command({
    command: 'seed:workshops',
    describe: 'seed workshops',
    autoExit: true,
  })
  async seedWorkshops(): Promise<void> {
    const categories = Object.values(Categories);

    for (const [idx, id] of instructorIds.entries()) {
      const category = categories[idx];
      await this.workshopsService.create({
        name: `${categories[idx]} Workshop`,
        description: `Learn ${category} skills`,
        category,
        gallery: [
          'https://picsum.photos/200/300',
          'https://picsum.photos/200/300',
          'https://picsum.photos/200/300',
        ],
        offerings: [
          {
            address: faker.address.streetAddress(),
            capacity: faker.random.number(50),
            startDate: faker.date.future(),
            endDate: faker.date.future(),
            location: workshopLocs[idx],
            occupied: 0,
            price: faker.random.number({ min: 50, max: 200 }),
          },
          {
            address: faker.address.streetAddress(),
            capacity: faker.random.number(50),
            startDate: faker.date.future(),
            endDate: faker.date.future(),
            location: workshopLocs[idx],
            occupied: 0,
            price: faker.random.number({ min: 50, max: 200 }),
          },
        ],
        _instructor: new ObjectId(id),
      });
    }
  }

  @Command({
    command: 'seed:reviews',
    describe: 'seed reviews',
    autoExit: true,
  })
  async seedReviews(): Promise<void> {
    for (const [idx, id] of instructorIds.entries()) {
      await this.reviewsService.create({
        rating:faker.random.number(10),
        description:faker.random.words(7),
        reports:faker.random.number(10),
        _instructor: new ObjectId(id),
      });
    }
  }
}
