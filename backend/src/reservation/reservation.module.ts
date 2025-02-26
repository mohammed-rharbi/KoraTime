import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { ReservationRepository } from './reservation.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation , ReservationSchema } from './entities/reservation.entity';

@Module({

  imports:[ MongooseModule.forFeature([{ name: Reservation.name , schema: ReservationSchema}])],
  controllers: [ReservationController],
  providers: [ReservationService , ReservationRepository],  
})
export class ReservationModule {}
