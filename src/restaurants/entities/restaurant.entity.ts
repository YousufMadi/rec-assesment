import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { DietaryRestrictions } from "../../common/entities/diet-restrictions.entity";

@Entity()
export class Restaurant {
    @PrimaryGeneratedColumn()
    restaurantId: number;

    @Column()
    name: string;

    @ManyToMany(() => DietaryRestrictions, dietaryRestriction => dietaryRestriction.diners)
    dietaryEndorsements: DietaryRestrictions[];
}