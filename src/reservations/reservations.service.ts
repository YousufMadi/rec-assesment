import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { In, Repository } from 'typeorm';
import { Diner } from '../diners/entities/diner.entity';
import { DietaryRestrictions } from '../common/entities/diet-restrictions.entity';
import { Restaurant } from '../restaurants/entities/restaurant.entity';
import { RestaurantTable } from '../restaurants/entities/restaurantTable.entity';
import { Reservation } from './entities/reservation.entity';
import { ReservationGuests } from './entities/reservation-guests.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Diner)
    private dinerRepository: Repository<Diner>,
    @InjectRepository(DietaryRestrictions)
    private dietaryRestrictionsRepository: Repository<DietaryRestrictions>,
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    @InjectRepository(RestaurantTable)
    private tableRepository: Repository<RestaurantTable>,
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectRepository(ReservationGuests)
    private reservationGuestsRepository: Repository<ReservationGuests>,
  ) { }

  async delete(reservationId: number): Promise<void> {
    const reservation = await this.reservationRepository.findOne({ where: { reservationId }, relations: ["reservationGuests"] });

    if (!reservation) {
      throw new Error(`No reservation found with ID ${reservationId}`);
    }

    // Delete ReservationGuests
    await this.reservationGuestsRepository.remove(reservation.reservationGuests);

    // Delete reservation
    await this.reservationRepository.remove(reservation);
  }

  async create(createReservationDto: CreateReservationDto): Promise<Reservation> {
    const reservation = this.reservationRepository.create({
      tableId: createReservationDto.tableId,
      startTime: createReservationDto.startTime,
      endTime: createReservationDto.endTime,
    });
    const savedReservation = await this.reservationRepository.save(reservation);

    // Create ReservationGuests for each dinerId
    for (const dinerId of createReservationDto.dinerIds) {
      const reservationGuest = this.reservationGuestsRepository.create({
        reservationId: savedReservation.reservationId,
        dinerId: dinerId,
      });
      await this.reservationGuestsRepository.save(reservationGuest);
    }

    return this.reservationRepository.findOne({ where: { reservationId: savedReservation.reservationId }, relations: ['reservationGuests'] });
  }
  async findRestaurantsForDiners(dinerIds: number[], dinersCount: number, desiredTime: Date) {
    // Step 1: Aggregate dietary restrictions for provided diners
    const diners = await this.dinerRepository.find({
      where: { dinerId: In(dinerIds) },
      relations: ['dietaryRestrictions'],
    });

    const dietaryRestrictionsIds = new Set(diners.flatMap(diner => diner.dietaryRestrictions.map(dr => dr.dietaryRestrictionsId)));

    // Step 2: Identify suitable restaurants that match all dietary restrictions
    const suitableRestaurants = await this.restaurantRepository.query(
      `SELECT restaurant."restaurantId", restaurant.name
      FROM restaurant
      INNER JOIN restaurant_dietary_endorsements ON restaurant."restaurantId" = restaurant_dietary_endorsements."restaurantId"
      WHERE restaurant_dietary_endorsements."dietaryRestrictionsId" = ANY($1)`,
      [Array.from(dietaryRestrictionsIds)]
    );

    // Assuming reservations last for 2 hours
    const reservationStartTime = new Date(desiredTime);
    const reservationEndTime = new Date(desiredTime);
    reservationEndTime.setHours(reservationEndTime.getHours() + 2);

    let allReservations = await this.reservationRepository.find();
    let reservedTables = allReservations.map(reservation => reservation.tableId);


    // Filter for tables in these restaurants that can fit the diners and are not reserved at the desired time
    const allReservableTables = await this.tableRepository.createQueryBuilder("table")
      .leftJoinAndSelect(Reservation, "reservation", "table.tableId = reservation.tableId AND reservation.startTime < :end AND reservation.endTime > :start", { start: reservationStartTime, end: reservationEndTime })
      .where("table.capacity >= :count", { count: dinersCount })
      .andWhere("table.restaurantId IN (:...restaurantIds)", { restaurantIds: suitableRestaurants.map(r => r.restaurantId) })
      .andWhere("reservation.reservationId IS NULL") // Only consider tables without a conflicting reservation
      .getMany();

    const availableTables = allReservableTables.filter(table => !reservedTables.includes(table.tableId));
    const availableRestaurantsMap = {};
    suitableRestaurants.forEach(restaurant => {
      availableRestaurantsMap[restaurant.name] =
        availableTables.filter(table =>
          table.restaurantId === restaurant.restaurantId)
          .sort((a, b) => a.capacity - b.capacity)[0];
    });

    // Return restaurants that have at least one available table
    const filteredRestaurantsMap = Object.fromEntries(
      Object.entries(availableRestaurantsMap).filter(([_, table]) => table !== undefined)
    );
    return filteredRestaurantsMap;
  }
} 