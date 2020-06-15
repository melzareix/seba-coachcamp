import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { InstructorsService } from '../services/instructors.service';
import * as faker from 'faker';
import { instructorIds } from 'src/seeds/constants';

@Injectable()
export class InstructorsSeed {
  constructor(private readonly instructorsService: InstructorsService) {}

  @Command({
    command: 'seed:instructors',
    describe: 'seed instructors',
    autoExit: true,
  })
  async create(): Promise<void> {
    for (const id of instructorIds) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();

      await this.instructorsService.create({
        _id: id,
        name: `${firstName} ${lastName}`,
        description: faker.lorem.sentence(),
        email: `${lastName}@instructor.com`,
        password: 'helloworld',
        phone: '+491761923323',
      });
    }
  }
}
