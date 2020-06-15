import { Controller, Query, Get, Param } from '@nestjs/common';
import { Instructor } from './models/instructor.model';
import { InstructorsService } from './services/instructors.service';
import { InstructorCreateDto } from './instructors.types';
import { Workshop } from 'src/workshops/models/workshop.model';

@Controller('instructors')
export class InstructorsController {
  constructor(public instructorsService: InstructorsService) {}
  async registerInstructor(
    @Query() instructorCreateDto: InstructorCreateDto,
  ): Promise<Instructor> {
    return this.instructorsService.create(instructorCreateDto);
  }

  @Get(':id')
  async getInstructor(
    @Param('id') id: string,
    @Query('workshops') findWorkshops: boolean,
  ): Promise<Record<string, unknown>> {
    const instructor = await this.instructorsService.findById(id);
    let workshops;
    if (findWorkshops) {
      workshops = await this.instructorsService.findInstructorWorkshops(id);
    }
    return {
      instructor,
      workshops,
    };
  }

  @Get(':id/workshops')
  async getInstructorWorkshops(
    @Param('id') id: string,
  ): Promise<Workshop[] | null> {
    return this.instructorsService.findInstructorWorkshops(id);
  }
}
