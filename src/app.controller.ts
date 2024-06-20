import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { GetWeatherDataDto, PostWeatherDataDto } from './dto';
import { GetInterceptor } from './interceptors/get.interceptor';

@UseInterceptors(GetInterceptor)
@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getWeatherData(
    @Query(
      new ValidationPipe({
        transform: true,
      }),
    )
    query: GetWeatherDataDto,
  ) {
    return this.appService.getWeatherData(query);
  }

  @Post()
  async setWeatherData(
    @Body(
      new ValidationPipe({
        transform: true,
      }),
    )
    body: PostWeatherDataDto,
  ) {
    return this.appService.setWeatherData(body);
  }
}
