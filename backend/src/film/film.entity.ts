import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Schedule } from '../schedule/schedule.entity';

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  duration: number;

  @OneToMany(() => Schedule, (schedule) => schedule.film, { cascade: true })
  schedules: Schedule[];
}
