import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../../film/film.entity';
import { Schedule } from '../../schedule/schedule.entity';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,

    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async createOrder(dto: OrderDto) {
    const filmId = Number(dto.filmId);
    const sessionId = Number(dto.sessionId);

    const film = await this.filmRepository.findOne({
      where: { id: filmId },
      relations: ['schedules'],
    });
    if (!film) throw new BadRequestException('Film not found');

    const session = film.schedules.find((s) => s.id === sessionId);
    if (!session) throw new BadRequestException('Session not found');

    const seatStr = `${dto.seat.row}:${dto.seat.place}`;

    if (session.occupiedSeats.includes(seatStr)) {
      throw new BadRequestException('Seat already taken');
    }

    session.occupiedSeats.push(seatStr);
    await this.scheduleRepository.save(session);

    return { success: true, bookedSeat: seatStr };
  }
}
