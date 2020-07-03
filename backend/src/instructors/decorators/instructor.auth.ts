import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { WorkshopsGuard } from '../guards/workshops.guard';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function InstructorAuth() {
  return applyDecorators(
    UseGuards(AuthGuard('jwt'), WorkshopsGuard),
    ApiBearerAuth(),
  );
}

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return user?.[data];
  },
);
