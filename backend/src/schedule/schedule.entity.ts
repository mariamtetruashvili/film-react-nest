import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Film } from '../film/film.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startTime: Date;

  @Column('simple-array', { default: '' })
  occupiedSeats: string[];

  @ManyToOne(() => Film, (film) => film.schedules, { onDelete: 'CASCADE' })
  film: Film;
}
