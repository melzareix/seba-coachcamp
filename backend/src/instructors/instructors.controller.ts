import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {InstructorsService} from './services/instructors.service';
import {InstructorCreateDto, InstructorLoginDto, InstructorLoginRespone,} from './instructors.types';
import {Workshop} from 'src/workshops/models/workshop.model';

@Controller('instructors')
export class InstructorsController {
  constructor(public instructorsService: InstructorsService) {
  }

  @Post('/register')
  async registerInstructor(
    @Body() instructorCreateDto: InstructorCreateDto,
  ): Promise<InstructorLoginRespone> {
    await this.instructorsService.create(instructorCreateDto);
    return this.instructorsService.login({
      email: instructorCreateDto.email,
      password: instructorCreateDto.password,
    });
  }

  @Post('/login')
  async loginInstructor(
    @Body() body: InstructorLoginDto,
  ): Promise<InstructorLoginRespone> {
    return this.instructorsService.login(body);
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
    const workshops = await this.instructorsService.findInstructorWorkshops(id);
    return workshops;
  }
}
