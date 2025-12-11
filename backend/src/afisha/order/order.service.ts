import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDto } from './dto/order.dto';
import { Film, FilmDocument } from '../films/schemas/film.schema';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async createOrder(dto: OrderDto) {
    const { filmId, sessionId, seat } = dto;

    const film = await this.filmModel.findOne({ id: filmId });
    if (!film) throw new BadRequestException('Film not found');

    const session = film.schedule.find((s) => s.sessionId === sessionId);
    if (!session) throw new BadRequestException('Session not found');

    const seatStr = `${seat.row}:${seat.place}`;

    if (session.occupiedSeats.includes(seatStr)) {
      throw new BadRequestException('Seat already taken');
    }

    session.occupiedSeats.push(seatStr);

    await film.save();

    return { success: true, bookedSeat: seatStr };
  }
}
