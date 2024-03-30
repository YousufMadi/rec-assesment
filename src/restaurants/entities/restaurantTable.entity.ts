import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { Reservation } from '../../reservations/entities/reservation.entity';

@Entity()
export class RestaurantTable {
    @PrimaryGeneratedColumn()
    tableId: number;

    @Column()
    capacity: number;

    @Column()
    restaurantId: number;

    @ManyToOne(() => Restaurant)
    @JoinColumn({ name: 'restaurantId' })
    restaurant: Restaurant;
}