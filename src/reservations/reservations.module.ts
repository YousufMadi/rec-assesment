import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diner } from '../diners/entities/diner.entity';
import { DietaryRestrictions } from '../common/entities/diet-restrictions.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { RestaurantTable } from 'src/restaurants/entities/restaurantTable.entity';
import { Reservation } from './entities/reservation.entity';
import { ReservationGuests } from './entities/reservation-guests.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Diner, DietaryRestrictions, Restaurant, RestaurantTable, Reservation, ReservationGuests])],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule { }
