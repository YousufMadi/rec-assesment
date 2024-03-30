import { ReservationGuests } from "src/reservations/entities/reservation-guests.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { DietaryRestrictions } from "../../common/entities/diet-restrictions.entity";

@Entity()
export class Diner {
    @PrimaryGeneratedColumn()
    dinerId: number;

    @Column()
    name: string;

    // Define the inverse side of the ReservationEaters relationship
    @OneToMany(() => ReservationGuests, resGuests => resGuests.diner)
    reservationEaters: ReservationGuests[];

    // New ManyToMany relationship for dietary restrictions
    @ManyToMany(() => DietaryRestrictions, dietaryRestriction => dietaryRestriction.diners)
    dietaryRestrictions: DietaryRestrictions[];
}
