import { Module } from '@nestjs/common';
import { WorkshopsService } from './services/workshops.service';
import { WorkshopsController } from './controllers/workshops.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Workshop } from './models/workshop.model';
import { CommandModule } from 'nestjs-command';

@Module({
  imports: [CommandModule, TypegooseModule.forFeature([Workshop])],
  providers: [WorkshopsService],
  controllers: [WorkshopsController],
  exports: [WorkshopsService],
})
export class WorkshopsModule {}
