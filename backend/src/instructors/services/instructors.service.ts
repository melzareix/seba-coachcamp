import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Workshop } from 'src/workshops/models/workshop.model';
import { WorkshopsService } from 'src/workshops/services/workshops.service';
import {
  InstructorCreateDto,
  InstructorLoginDto,
  InstructorLoginRespone,
} from '../instructors.types';
import { Instructor } from '../models/instructor.model';
@Injectable()
export class InstructorsService {
  constructor(
    @InjectModel(Instructor)
    private readonly instructorModel: ReturnModelType<typeof Instructor>,
    private readonly workshopsService: WorkshopsService,
    private readonly jwtService: JwtService,
  ) {}

  async create(instructor: InstructorCreateDto): Promise<Instructor> {
    return await this.instructorModel.create(instructor);
  }

  async findById(id: string): Promise<Instructor | null> {
    return this.instructorModel.findById(id);
  }

  async findByEmail(email: string): Promise<Instructor | null> {
    return await this.instructorModel.findOne({
      email,
    });
  }

  async findInstructorWorkshops(id: string): Promise<Workshop[]> {
    return this.workshopsService.findInstructorWorkshops(id);
  }

  async login(payload: InstructorLoginDto): Promise<InstructorLoginRespone> {
    const user = await this.findByEmail(payload.email);
    const password = await user?.checkPassword(payload.password);
    if (!user || !password) {
      throw new HttpException('Incorrect email or password.', 401);
    }
    const token = await this.jwtService.signAsync((user as any).toJSON());
    return {
      token,
    };
  }
}
