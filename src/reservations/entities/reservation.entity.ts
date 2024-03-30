import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { RestaurantTable } from '../../restaurants/entities/restaurantTable.entity';
import { ReservationGuests } from './reservation-guests.entity';

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    reservationId: number;

    @Column()
    tableId: number;

    @ManyToOne(() => RestaurantTable)
    @JoinColumn({ name: 'tableId' })
    table: RestaurantTable;

    @Column()
    startTime: Date;

    @Column()
    endTime: Date;

    @OneToMany(() => ReservationGuests, resGuests => resGuests.reservation, { cascade: true })
    reservationGuests: ReservationGuests[];
}