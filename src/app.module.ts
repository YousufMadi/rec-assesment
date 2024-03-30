import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DinersModule } from './diners/diners.module';
import { CommonModule } from './common/common.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { ReservationsModule } from './reservations/reservations.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'test',
      password: 'test',
      database: 'friends_and_food',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Use only in development, in production you might want to use migrations instead
      // logging: true,
    }),
    DinersModule,
    CommonModule,
    RestaurantsModule,
    ReservationsModule,
    SeedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
