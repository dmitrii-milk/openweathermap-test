import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db';
import { OpenWeatherModule } from './open-weather/open-weather.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    OpenWeatherModule,
    DbModule.register({ ...configuration().database }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
