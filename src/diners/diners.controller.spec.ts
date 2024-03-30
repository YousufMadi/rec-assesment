import { Test, TestingModule } from '@nestjs/testing';
import { DinersController } from './diners.controller';
import { DinersService } from './diners.service';

describe('DinersController', () => {
  let controller: DinersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DinersController],
      providers: [DinersService],
    }).compile();

    controller = module.get<DinersController>(DinersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
