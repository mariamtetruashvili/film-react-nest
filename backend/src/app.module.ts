import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';

import { configProvider } from './app.config.provider';
import { FilmsController } from './afisha/films/films.controller';
import { FilmsService } from './afisha/films/films.service';
import { OrderController } from './afisha/order/order.controller';
import { OrderService } from './afisha/order/order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from './afisha/films/schemas/film.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),

    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public', 'content', 'afisha'),
      serveRoot: '/content/afisha',
    }),

    MongooseModule.forRoot(process.env.DATABASE_URL),
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
  ],
  controllers: [FilmsController, OrderController],
  providers: [configProvider, FilmsService, OrderService],
})
export class AppModule {}
