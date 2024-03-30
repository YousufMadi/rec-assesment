// reservation-eaters.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Reservation } from './reservation.entity';
import { Diner } from 'src/diners/entities/diner.entity';

@Entity()
export class ReservationGuests {
    @PrimaryColumn()
    reservationId: number;

    @PrimaryColumn()
    dinerId: number;

    @ManyToOne(() => Reservation, reservation => reservation.reservationGuests)
    @JoinColumn({ name: 'reservationId' })
    reservation: Reservation;

    @ManyToOne(() => Diner, diner => diner.reservationEaters)
    @JoinColumn({ name: 'dinerId' })
    diner: Diner;
}
