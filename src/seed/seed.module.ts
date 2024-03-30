// src/seed/seed.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { Restaurant } from '../restaurants/entities/restaurant.entity';
import { RestaurantTable } from '../restaurants/entities/restaurantTable.entity';
import { DietaryRestrictions } from 'src/common/entities/diet-restrictions.entity';
import { Diner } from '../diners/entities/diner.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Restaurant, RestaurantTable, Diner, DietaryRestrictions])],
    providers: [SeedService],
})
export class SeedModule { }
