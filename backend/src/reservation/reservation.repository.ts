import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Reservation , ReservationSchema } from "./entities/reservation.entity";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { UpdateReservationDto } from "./dto/update-reservation.dto";


@Injectable()

export class ReservationRepository {

    constructor(@InjectModel(Reservation.name) private readonly ReservationModel : Model<Reservation> ){}


    async create(reservationData: CreateReservationDto ): Promise<Reservation>{

        const field =  new this.ReservationModel(reservationData);
        await field.save();

        return field
    }
    
    async findAll() : Promise<Reservation[]>{

        return await this.ReservationModel.find().populate('userId' , 'userName email phoneNumber').populate('fieldId','name price fieldManger location').exec();
    }


    async findByStatus (status: string) : Promise<Reservation[]>{

        return await this.ReservationModel.find({status: status}).exec();
    }


    async findById(id : string): Promise<Reservation>{

        return await (await this.ReservationModel.findOne({_id: id})).populate('fieldId')

    }

    async findByUserId(id : string): Promise<Reservation>{

        return await this.ReservationModel.findOne({userId: id}).populate('userId' , 'userName email phoneNumber').populate('fieldId','name price fieldManger location').exec();

    }

    async findByTeamId(id : string): Promise<Reservation>{

        return await this.ReservationModel.findOne({teamId: id}).exec();

    }

    async update(id: string , reservationData: UpdateReservationDto ): Promise<Reservation>{

        return await this.ReservationModel.findByIdAndUpdate(id , reservationData , {new: true}).exec();
    }


    async delete(id: string): Promise<Reservation>{
        
        return await this.ReservationModel.findByIdAndDelete(id).exec();
    }

}