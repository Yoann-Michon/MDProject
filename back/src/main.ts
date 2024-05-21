import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions: CorsOptions = {
    origin: true, // Permettre à toutes les origines d'accéder à l'API
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Méthodes autorisées
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true, // Autoriser l'envoi de cookies
  };
  app.enableCors(corsOptions);
  await app.listen(4000);
}
bootstrap();
