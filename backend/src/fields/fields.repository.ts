import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Field , FieldSchema } from "./entities/field.entity";
import { CreateFieldDto } from "./dto/create-field.dto";
import { UpdateFieldDto } from "./dto/update-field.dto";


@Injectable()

export class FieldRepository {

    constructor(@InjectModel(Field.name) private readonly FieldModel : Model<Field> ){}


    async create(FiledData: CreateFieldDto ): Promise<Field>{

        const field =  new this.FieldModel(FiledData);
        await field.save();

        return field
    }
    
    async findAll() : Promise<Field[]>{

        return await this.FieldModel.find().exec();
    }


    async findByStatus (status: string) : Promise<Field[]>{

        return await this.FieldModel.find({status: status}).exec();
    }


    async findById(id: string): Promise<Field | null> {
        const field = await this.FieldModel.findById(id).populate('fieldManger', 'userName email phoneNumber').exec();
        
        if (!field) {
            throw new NotFoundException(`Field with id ${id} not found`);
        }
    
        return field;
    }

    async update(id: string , FiledData: UpdateFieldDto ): Promise<Field>{

        return await this.FieldModel.findByIdAndUpdate(id , FiledData , {new: true}).exec();
    }


    async updateSlote(id: string, date: Date, startTime: string): Promise<Field> {
        const field = await this.FieldModel.findById(id);
    
        if (!field) {
            throw new NotFoundException("Field not found");
        }
    
        const availabilityEntry = field.availability.find((entry: any) => 
            new Date(entry.date).toISOString().split("T")[0] === new Date(date).toISOString().split("T")[0]
        );
    
        if (!availabilityEntry) {
            throw new NotFoundException("No availability for this date");
        }
    
        const slot = availabilityEntry.slots.find((slot: any) => slot.startTime === startTime);
    
        if (!slot) {
            throw new NotFoundException("Slot not found");
        }
    
        if (slot.isBooked) {
            throw new BadGatewayException("Slot is already booked");
        }
    
        slot.isBooked = true;
        await field.save();
    
        return field;
    }

    async checkAndUpdateExpiredSlots(): Promise<void> {
        const currentTime = new Date(); 
    
        const fields = await this.FieldModel.find();
    
        for (const field of fields) {
            for (const availabilityEntry of field.availability) {
                for (const slot of availabilityEntry.slots) {

                    const slotDateTime = new Date(`${availabilityEntry.date}T${slot.startTime}`);
    

                    if (isNaN(slotDateTime.getTime())) {
                        console.error(`Invalid slot time: ${availabilityEntry.date}T${slot.startTime}`);
                        continue;
                    }
    

                    if (slotDateTime < currentTime && !slot.isBooked) {
                        slot.isBooked = true;
                        console.log(`Slot on ${availabilityEntry.date} at ${slot.startTime} is now marked as booked.`);
                    }
                }
            }
            await field.save(); 
        }
    }
    
    
    
    async delete(id: string){
        
        return await this.FieldModel.findByIdAndDelete(id).exec();
    }

}