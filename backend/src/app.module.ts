import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WorkshopsModule } from './workshops/workshops.module';
import configuration from './config/configuration';
import { TypegooseModule } from 'nestjs-typegoose';
import { InstructorsModule } from './instructors/instructors.module';
import { StudentsModule } from './students/students.module';
import { SeedsModule } from './seeds/seeds.module';
import { StripeModule } from 'nestjs-stripe';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypegooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('database.host');
        const port = configService.get<string>('database.port');
        return {
          uri: `mongodb://${host}:${port}`,
        };
      },
      inject: [ConfigService],
    }),
    WorkshopsModule,
    InstructorsModule,
    StudentsModule,
    SeedsModule,
    StripeModule.forRoot({
      apiKey: 'sk_test_dBig0b9lzrkUOFOZsGLE1GSd',
      apiVersion: "2020-03-02"
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
