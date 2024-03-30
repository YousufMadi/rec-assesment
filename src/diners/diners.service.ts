import { Injectable } from '@nestjs/common';
import { CreateDinerDto } from './dto/create-diner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Diner } from './entities/diner.entity';

@Injectable()
export class DinersService {
  constructor(
    @InjectRepository(Diner)
    private dinersRepository: Repository<Diner>) {
  }

  create(createDinerDto: CreateDinerDto) {
    const diner = this.dinersRepository.create(createDinerDto);
    return this.dinersRepository.save(diner);
  }
}
