export class OrderDto {
  filmId: string;
  sessionId: string;
  seat: { row: number; place: number };
}
