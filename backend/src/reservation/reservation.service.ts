import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservation.repository';
import { FieldRepository } from '../fields/fields.repository';

@Injectable()
export class ReservationService {

  constructor(private readonly ReservationRepo: ReservationRepository , private readonly FieldRepo: FieldRepository ){}


  async createReservation(createReservationDto: CreateReservationDto) {


    const setBooking = await this.FieldRepo.updateSlote(createReservationDto.fieldId , createReservationDto.date , createReservationDto.startTime)

    if (!setBooking) {
      throw new BadRequestException("Failed to update the slot. Reservation cannot be created");
  }

    return await this.ReservationRepo.create(createReservationDto)

  }

  async getAllReservations() {

    const reservations = await this.ReservationRepo.findAll();

    if(!reservations || reservations.length < 0){
      throw new NotFoundException('No Reservation Ben Found')
    }

    return reservations
  }

  async getUserReservations(id:string) {

    const reservation = await this.ReservationRepo.findByUserId(id);

    if(!reservation){
      throw new NotFoundException('No Reservation Ben Found')
    }

    return reservation
  }

  async findReservation(id: string) {

    const reservation = await this.ReservationRepo.findById(id)

    if(!reservation){
      throw new NotFoundException('No Reservation Ben Found')
    }

    return reservation
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {

    return await this.ReservationRepo.update(id , updateReservationDto)
  
  }

  async removeReservation(id: string) {

    return await this.ReservationRepo.delete(id)
  }
  
}
