import { DynamicModule, Module } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from '../constants';

@Module({})
export class DbModule {
  static register(config: any): DynamicModule {
    const dbProvider = {
      provide: PG_CONNECTION,
      useValue: new Pool({
        user: config.user,
        host: config.host,
        database: config.database,
        password: config.password,
        port: config.port,
      }),
    };

    return {
      module: DbModule,
      providers: [dbProvider],
      exports: [dbProvider],
    };
  }
}
