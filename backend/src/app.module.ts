import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WorkshopsModule } from './workshops/workshops.module';
import configuration from './config/configuration';
import { TypegooseModule } from 'nestjs-typegoose';
import { InstructorsModule } from './instructors/instructors.module';
import { SeedsModule } from './seeds/seeds.module';
import { StripeModule } from 'nestjs-stripe';
import Stripe from 'stripe';

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
    SeedsModule,
    StripeModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const apiKey = configService.get<string>('stripe.apiKey');
        const apiVersion = configService.get<Stripe.LatestApiVersion>(
          'stripe.apiVersion',
        );
        return {
          apiKey,
          apiVersion,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
