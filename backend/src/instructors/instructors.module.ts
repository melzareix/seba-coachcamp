import { Module } from '@nestjs/common';
import { InstructorsService } from './services/instructors.service';
import { InstructorsController } from './instructors.controller';
import { Instructor } from './models/instructor.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { WorkshopsModule } from 'src/workshops/workshops.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
    TypegooseModule.forFeature([Instructor]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('jwt.instructor.key'),
        };
      },
      inject: [ConfigService],
    }),
    WorkshopsModule,
  ],
  providers: [InstructorsService],
  controllers: [InstructorsController],
  exports: [InstructorsService],
})
export class InstructorsModule {}
