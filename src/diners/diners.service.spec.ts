import { Test, TestingModule } from '@nestjs/testing';
import { DinersService } from './diners.service';

describe('DinersService', () => {
  let service: DinersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DinersService],
    }).compile();

    service = module.get<DinersService>(DinersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
