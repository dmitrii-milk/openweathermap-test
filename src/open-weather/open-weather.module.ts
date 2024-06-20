import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { OpenWeatherService } from './open-weather.service';

@Module({
imports: [ConfigModule.forRoot(),],
  providers: [OpenWeatherService],
  exports: [OpenWeatherService],
})
export class OpenWeatherModule {}
