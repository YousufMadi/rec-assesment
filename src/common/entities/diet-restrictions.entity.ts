import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Diner } from "src/diners/entities/diner.entity";
import { Restaurant } from "src/restaurants/entities/restaurant.entity";

@Entity()
export class DietaryRestrictions {
    @PrimaryGeneratedColumn()
    dietaryRestrictionsId: number;

    @Column()
    name: string;

    @ManyToMany(() => Diner, diner => diner.dietaryRestrictions)
    @JoinTable({
        name: "diner_dietary_restrictions", // Custom join table name
        joinColumn: {
            name: "dietaryRestrictionId", // Column in join table linking to DietaryRestriction
            referencedColumnName: "dietaryRestrictionsId", // Primary key in DietaryRestriction, assumed "id" if omitted
        },
        inverseJoinColumn: {
            name: "dinerId", // Column in join table linking to Diner
            referencedColumnName: "dinerId", // Correctly points to the primary key in Diner
        },
    })
    diners: Diner[];

    @ManyToMany(() => Restaurant, restaurant => restaurant.dietaryEndorsements)
    @JoinTable({
        name: "restaurant_dietary_endorsements", // Custom join table name is correct
        joinColumn: {
            name: "dietaryRestrictionsId", // This should match the column in the join table linking to DietaryRestrictions
            referencedColumnName: "dietaryRestrictionsId", // This should match the primary key name in the DietaryRestrictions entity
        },
        inverseJoinColumn: {
            name: "restaurantId", // This should match the column in the join table linking to Restaurant
            referencedColumnName: "restaurantId", // This should match the primary key name in the Restaurant entity
        },
    })
    restaurants: Restaurant[];
}
