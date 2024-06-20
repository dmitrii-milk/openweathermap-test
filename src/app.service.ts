import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from './constants';
import { PostWeatherDataDto } from './dto';
import { TGetDataPayload } from './interfaces';
import { OpenWeatherService } from './open-weather/open-weather.service';
import { Pool } from 'pg';

@Injectable()
export class AppService {
  constructor(
    private openWeatherService: OpenWeatherService,
    @Inject(PG_CONNECTION) private conn: Pool,
  ) {}

  async getWeatherData(query: TGetDataPayload) {
    const selectQuery = `SELECT *
    FROM "Weather" w
    WHERE data->'coord'->>'lon' = $1
    AND data->'coord'->>'lat' = $2`;

    const { rows } = await this.conn.query(selectQuery, [query.lon, query.lat]);

    return rows?.[0]?.data;
  }

  async setWeatherData(query: PostWeatherDataDto) {
    const apiResponse = await this.openWeatherService.getData(query);

    const insertQuery = 'INSERT INTO "Weather" (data) VALUES ($1)';

    await this.conn.query(insertQuery, [apiResponse]);

    return { status: 'ok' };
  }
}
