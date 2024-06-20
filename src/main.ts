import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import setupEnvironment from './setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  await setupEnvironment({
    database: config.get('database'),
    pg: config.get('pg'),
  });

  await app.listen(3000);
}

bootstrap();
