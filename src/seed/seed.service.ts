// src/seed/seed.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Restaurant } from '../restaurants/entities/restaurant.entity';
import { RestaurantTable } from '../restaurants/entities/restaurantTable.entity';
import { Diner } from '../diners/entities/diner.entity';
import { DietaryRestrictions } from 'src/common/entities/diet-restrictions.entity';
import * as dietaryRestrictionData from './diet-restrictions.json';
import * as restaurantData from './restaurants.json';
import * as tableData from './tables.json';
import * as dinerData from './diners.json';

@Injectable()
export class SeedService {
    constructor(
        private dataSource: DataSource,
        @InjectRepository(Restaurant)
        private readonly restaurantRepository: Repository<Restaurant>,
        @InjectRepository(RestaurantTable)
        private readonly tableRepository: Repository<RestaurantTable>,
        @InjectRepository(Diner)
        private readonly dinerRepository: Repository<Diner>,
        @InjectRepository(DietaryRestrictions)
        private readonly dietRepository: Repository<DietaryRestrictions>,
    ) { }

    async reseed() {
        await this.clearData();
        await this.seedAll();
    }

    private async clearData() {
        try {
            await this.dataSource.dropDatabase();
            await this.dataSource.synchronize();
            console.log('Database cleared and tables re-created.');
        } catch (error) {
            console.error('Error clearing database:', error);
        }

    }

    async seedRestaurants(): Promise<void> {
        for (const item of restaurantData) {
            const newRestaurant = this.restaurantRepository.create(item);
            await this.restaurantRepository.save(newRestaurant);
        }
    }

    async seedTables(): Promise<void> {
        for (const item of tableData) {
            const newTable = this.tableRepository.create(item);
            await this.tableRepository.save(newTable);
        }
    }

    async seedDiners(): Promise<void> {
        for (const item of dinerData) {
            const newDiner = this.dinerRepository.create(item);
            await this.dinerRepository.save(newDiner);
        }
    }

    async seedDietaryRestrictions(): Promise<void> {
        for (const item of dietaryRestrictionData) {
            const newDietaryRestriction = this.dietRepository.create(item);
            await this.dietRepository.save(newDietaryRestriction);
        }
    }

    async seedAll(): Promise<void> {
        await this.seedRestaurants();
        await this.seedTables();
        await this.seedDiners();
        await this.seedDietaryRestrictions();
        console.log('Seeding complete!');
    }
}
