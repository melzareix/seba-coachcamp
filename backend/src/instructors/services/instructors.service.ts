import { Injectable } from '@nestjs/common';
import { Instructor } from '../models/instructor.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { InstructorCreateDto } from '../instructors.types';
import { WorkshopsService } from 'src/workshops/services/workshops.service';
import { Workshop } from 'src/workshops/models/workshop.model';

@Injectable()
export class InstructorsService {
  constructor(
    @InjectModel(Instructor)
    private readonly instructorModel: ReturnModelType<typeof Instructor>,
    private readonly workshopsService: WorkshopsService,
  ) {}

  async create(instructor: InstructorCreateDto): Promise<Instructor> {
    return await this.instructorModel.create(instructor);
  }

  async findById(id: string): Promise<Instructor | null> {
    return this.instructorModel.findById(id);
  }

  async findInstructorWorkshops(id: string): Promise<Workshop[]> {
    return this.workshopsService.findInstructorWorkshops(id);
  }
}
