import { Controller, Get, Post, Query, Body, Delete, Param } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ParseIntPipe } from '@nestjs/common';

// This cache isnt going to be utilized and it isnt a good practice in real scenario,
// but I am using it here to show that I can use a cache to store the available restaurants.
const localCache = {};
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {
  }

  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    const reservation = this.reservationsService.create(createReservationDto);
    return reservation;
  }

  @Get('/findForDiners')
  async findRestaurantsForDiners(
    @Query('dinerIds') dinerIds: string, // A comma-separated list of diner IDs
    @Query('dinersCount') dinersCount: string, // The number of diners
    @Query('desiredTime') desiredTime: string // The desired reservation time in an appropriate string format
  ) {
    // Parsing diner IDs from the query string
    const parsedDinerIds = dinerIds.split(',').map(id => parseInt(id, 10));
    const parsedDinersCount = parseInt(dinersCount, 10);
    const parsedDesiredTime = new Date(desiredTime);

    // Call the service method with the parsed parameters
    const availableRestaurants = await this.reservationsService.findRestaurantsForDiners(parsedDinerIds, parsedDinersCount, parsedDesiredTime);
    localCache['availableRestaurants'] = availableRestaurants;
    return Object.keys(availableRestaurants);
  }

  @Delete(':reservationId')
  async remove(@Param('reservationId', ParseIntPipe) reservationId: number) {
    await this.reservationsService.delete(reservationId);
    return { message: 'Reservation deleted successfully' };
  }
}
