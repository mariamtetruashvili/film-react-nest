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

  async getFilms(): Promise<Film[]> {
    return this.filmRepository.find({ relations: ['schedules'] });
  }

  async getFilmSchedule(id: number) {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: ['schedules'],
    });
    return film ? film.schedules : [];
  }
}
