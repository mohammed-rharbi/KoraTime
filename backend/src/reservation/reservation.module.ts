import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { ReservationRepository } from './reservation.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation , ReservationSchema } from './entities/reservation.entity';
import { FieldsModule } from '../fields/fields.module';

@Module({

  imports:[MongooseModule.forFeature([{ name: Reservation.name , schema: ReservationSchema}]) , FieldsModule],
  controllers: [ReservationController],
  providers: [ReservationService , ReservationRepository],  
})
export class ReservationModule {}
  