import { BadRequestException, Injectable } from "@nestjs/common";
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


    async findById(id : string): Promise<Field>{

        return await this.FieldModel.findOne({_id: id}).exec();

    }

    async update(id: string , FiledData: UpdateFieldDto ): Promise<Field>{

        return await this.FieldModel.findByIdAndUpdate(id , FiledData , {new: true}).exec();
    }


    async delete(id: string){
        
        return await this.FieldModel.findByIdAndDelete(id).exec();
    }

}