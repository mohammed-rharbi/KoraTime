import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User  } from "./entities/auth.entity";
import { CreateUserDto } from "./dto/create-auth.dto";
import { UpdateUserDto } from "./dto/update-auth.dto";
import { StartingUserDto } from "./dto/starting-auth.dto";



@Injectable()

export class AuthRepository {

    constructor(@InjectModel(User.name) private readonly UserModel : Model<User> ){}


    async create(userData: CreateUserDto ): Promise<User>{

        const user =  new this.UserModel(userData);
        await user.save();

        return user
    }
    
    async findAll() : Promise<User[]>{

        return await this.UserModel.find().exec();
    }

    async getAllManagers() : Promise<User[]>{

        return await this.UserModel.find({role:'fieldManager'}).exec();
    }

    async getAllPlayers() : Promise<User[]>{

        return await this.UserModel.find({role:'user'}).exec();
    }

    async findByEmail (email: string) : Promise<User>{

        return await this.UserModel.findOne({email}).exec();
    }


    async findById(id : string): Promise<User>{

        return await this.UserModel.findOne({_id: id}).exec();

    }

    async update(userData: StartingUserDto ): Promise<User>{

        return await this.UserModel.findByIdAndUpdate(userData.id , userData , {new: true}).exec();
    }


    async delete(id: string): Promise<User>{
        
        return await this.UserModel.findByIdAndDelete(id).exec();
    }

    async ban(id: string){
        
        return await this.UserModel.findByIdAndUpdate(id , {isBand:true} ,  {new: true}).exec();
    }

    async unban(id: string){
        
        return await this.UserModel.findByIdAndUpdate(id , {isBand:false} ,  {new: true}).exec();
    }

}