import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DinersService } from './diners.service';
import { DinersController } from './diners.controller';
import { Diner } from './entities/diner.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Diner])],
  controllers: [DinersController],
  providers: [DinersService],
})
export class DinersModule { }
