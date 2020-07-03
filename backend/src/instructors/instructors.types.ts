import { Workshop } from 'src/workshops/models/workshop.model';

export class InstructorCreateDto {
  _id?: string;
  name: string;
  email: string;
  password: string;
  description: string;
  phone: string;
}

export class InstructorLoginRespone {
  token: string;
}

export class InstructorLoginDto {
  email: string;
  password: string;
}

export class InstructorUser {
  workshops: string[];
}
