import { forwardRef, Module, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from './../auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    ConfigModule.forRoot({
      envFilePath: ".env"
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME_USER,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UsersController],
  providers: [
    // Garantit que les DTOs sont utilisés efficacement et que les données transférées sont valides avant d'être traitées par vos services ou contrôleurs
    { provide: APP_PIPE, useClass: ValidationPipe },
    UsersService
  ],
})
export class UsersModule {}
