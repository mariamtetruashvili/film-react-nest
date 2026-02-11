import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from '../films.controller';
import { FilmsService } from '../films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  const mockFilmsService = {
    getFilms: jest.fn().mockResolvedValue([{ id: 1, title: 'Film 1' }]),
    getFilmSchedule: jest.fn().mockResolvedValue([{ id: 1, time: '12:00' }]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [{ provide: FilmsService, useValue: mockFilmsService }],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  it('should return all films', async () => {
    const films = await controller.getFilms();
    expect(films).toEqual([{ id: 1, title: 'Film 1' }]);
  });

  it('should return schedule for a film', async () => {
    const schedule = await controller.getFilmSchedule('1');
    expect(schedule).toEqual([{ id: 1, time: '12:00' }]);
  });
});
