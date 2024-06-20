import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { IWeatherServiceResponse } from '../interfaces';

@Injectable()
export class GetInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const reqHttpMethod = request?.method;

    if (!reqHttpMethod) {
      throw new Error("Http method wasn't provided");
    }

    if (reqHttpMethod !== 'GET') {
      return next.handle();
    }

    return next.handle().pipe(map(this.transformData));
  }

  private transformData(data: IWeatherServiceResponse) {
    if (!data) {
      throw new NotFoundException('Data not found');
    }
    return {
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      temp: data.main.temp,
      feels_like: data.main.feels_like,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      // uvi: data.uvi,
      wind_speed: data.wind.speed,
    };
  }
}
