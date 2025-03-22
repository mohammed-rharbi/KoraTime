import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/jwt-auth.guard';

@Controller('reservation')
@UseGuards(JwtAuthGuard)
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post('createReservation')
  async createReservation(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.createReservation(createReservationDto)
  }

  @Get('findAllReservations')
  async findAllReservations() {
    return this.reservationService.getAllReservations()
  }

  @Get('getOneReservation/:id')
  async findOneReservation(@Param('id') id: string) {
    return this.reservationService.findReservation(id)
  }


  @Get('findUsersReservations/:id')
  async findUsersReservations(@Param('id') id: string) {
    return this.reservationService.getUserReservations(id)
  }


  @Patch('updateReservation/:id')
  async updateReservation(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationService.update(id, updateReservationDto);
  }

  @Delete('deleteReservation/:id')
  async deleteReservation(@Param('id') id: string) {
    return this.reservationService.removeReservation(id);
  }
}
