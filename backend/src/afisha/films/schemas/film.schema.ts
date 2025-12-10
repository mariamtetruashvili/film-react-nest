import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FilmDocument = Film & Document;

@Schema()
export class Film {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop([
    {
      sessionId: String,
      occupiedSeats: [String],
    },
  ])
  schedule: { sessionId: string; occupiedSeats: string[] }[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);
