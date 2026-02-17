import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../../film/film.entity';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
  ) {}

  async getFilms(): Promise<{ total: number; items: Film[] }> {
    const films = await this.filmRepository.find({ relations: ['schedule'] });
    return {
      total: films.length,
      items: films,
    };
  }

  async getFilmSchedule(id: string) {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: ['schedule'],
    });
    const schedule = film ? film.schedule : [];
    return {
      total: schedule.length,
      items: schedule,
    };
  }
}
