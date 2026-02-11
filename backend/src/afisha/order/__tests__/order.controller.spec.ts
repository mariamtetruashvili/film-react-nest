import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from '../order.controller';
import { OrderService } from '../order.service';

describe('OrderController', () => {
  let controller: OrderController;

  const mockOrderService = {
    createOrder: jest.fn().mockResolvedValue({ success: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [{ provide: OrderService, useValue: mockOrderService }],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should create order', async () => {
    const dto = {
      filmId: '1',
      sessionId: '1',
      seat: { row: 1, place: 1 },
    };
    const result = await controller.createOrder(dto);
    expect(result).toEqual({ success: true });
  });
});
