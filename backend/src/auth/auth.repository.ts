import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User  } from "./entities/auth.entity";
import { CreateUserDto } from "./dto/create-auth.dto";
import { UpdateUserDto } from "./dto/update-auth.dto";



@Injectable()

export class AuthRepository {

    constructor(@InjectModel(User.name) private readonly UserModel : Model<User> ){}


    async create(userData: CreateUserDto ): Promise<User>{

        const user =  new this.UserModel(userData);
        await user.save();

        return user
    }
    
    async findAll() : Promise<User[]>{

        return await this.UserModel.find({role: 'participant'}).exec();
    }


    async findByEmail (email: string) : Promise<User>{

        return await this.UserModel.findOne({email}).exec();
    }


    async findById(id : string): Promise<User>{

        return await this.UserModel.findOne({_id: id}).exec();

    }

    async update(id: string , userData: any ): Promise<User>{

        return await this.UserModel.findByIdAndUpdate(id , userData , {new: true}).exec();
    }


    async delete(id: string): Promise<User>{
        
        return await this.UserModel.findByIdAndDelete(id).exec();
    }

}