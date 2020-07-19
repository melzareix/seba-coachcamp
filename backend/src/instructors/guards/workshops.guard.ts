import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { InstructorUser } from '../instructors.types';

@Injectable()
export class WorkshopsGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user as InstructorUser;
    const workshopId = request.params.workshop_id;
    return user.workshops.includes(workshopId);
  }
}

@Injectable()
export class CreateWorkshopsGaurd implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user as InstructorUser;
    return user ? true : false;
  }
}
