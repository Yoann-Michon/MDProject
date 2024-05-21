import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Blog} from './entities/blog.entity';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath:".env"
  }),
  TypeOrmModule.forRoot({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_NAME_ARTICLE,
    autoLoadEntities: true,
    synchronize: true,
  }),TypeOrmModule.forFeature([Blog])],
  controllers: [BlogController],
  providers: [BlogService, 
    //garantit que les DTOs sont utilisés efficacement et que les données transférées sont valides avant d'être traitées par vos services ou contrôleurs
    {provide: APP_PIPE, useClass: ValidationPipe}
  ],
})
export class BlogModule {}
