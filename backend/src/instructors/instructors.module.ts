import { Module } from '@nestjs/common';
import { InstructorsService } from './services/instructors.service';
import { InstructorsController } from './instructors.controller';
import { Instructor } from './models/instructor.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { WorkshopsModule } from 'src/workshops/workshops.module';

@Module({
  imports: [TypegooseModule.forFeature([Instructor]), WorkshopsModule],
  providers: [InstructorsService],
  controllers: [InstructorsController],
  exports: [InstructorsService],
})
export class InstructorsModule {}
