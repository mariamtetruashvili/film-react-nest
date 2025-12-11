import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from './schemas/film.schema';
import { FilmDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async getFilms(): Promise<FilmDto[]> {
    return this.filmModel.find().exec();
  }

  async getFilmSchedule(id: string) {
    const film = await this.filmModel.findOne({ id }).exec();
    return film ? film.schedule : [];
  }
}
