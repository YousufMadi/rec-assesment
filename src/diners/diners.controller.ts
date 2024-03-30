import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DinersService } from './diners.service';
import { CreateDinerDto } from './dto/create-diner.dto';

@Controller('diners')
export class DinersController {
  constructor(private readonly dinersService: DinersService) { }

  @Post()
  create(@Body() createDinerDto: CreateDinerDto) {
    return this.dinersService.create(createDinerDto);
  }
}
