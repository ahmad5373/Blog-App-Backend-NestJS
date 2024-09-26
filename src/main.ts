import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '../http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    origin: true,
    methods:  'GET,HEAD,PUT ,PATCH,POST,DELETE',
    credentials: true,
  });
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
