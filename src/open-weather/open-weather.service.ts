import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IConfig, TGetDataPayload } from '../interfaces';

@Injectable()
export class OpenWeatherService {
  API_URL = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private configService: ConfigService<IConfig>) {}

  async getData({ lat, lon }: TGetDataPayload) {
    const reqQueryParams = new URLSearchParams({
      lat,
      lon,
      appid: this.configService.get('apiKey'),
    });

    const url = this.API_URL + `?${reqQueryParams}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw response;
      }

      return response.json();
    } catch (e) {
      console.log(e);

      throw new HttpException('custom message', HttpStatus.BAD_REQUEST, {
        cause: new Error('Cause Error'),
      });
    }
  }
}
