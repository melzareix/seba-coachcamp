import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InstructorsService } from './services/instructors.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly instructorsService: InstructorsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.instructor.key'),
    });
  }

  async validate(payload: Record<string, unknown>): Promise<unknown> {
    const workshops = await this.instructorsService.findInstructorWorkshops(
      payload.id as string,
    );
    return {
      ...payload,
      workshops: workshops.map(workshop => `${workshop._id}`),
    };
  }
}
