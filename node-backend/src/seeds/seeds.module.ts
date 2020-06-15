import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { WorkshopsSeed } from 'src/workshops/seeds/workshops.seed';
import { WorkshopsModule } from 'src/workshops/workshops.module';
import { InstructorsSeed } from 'src/instructors/seeds/instructors.seed';
import { InstructorsModule } from 'src/instructors/instructors.module';

@Module({
  imports: [CommandModule, WorkshopsModule, InstructorsModule],
  providers: [WorkshopsSeed, InstructorsSeed],
  exports: [WorkshopsSeed, InstructorsSeed],
})
export class SeedsModule {}
