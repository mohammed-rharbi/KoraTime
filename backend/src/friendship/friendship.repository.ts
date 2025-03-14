import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Friendship } from "./entities/friendship.entity";
import { CreateFriendshipDto } from "./dto/create-friendship.dto";
import { UpdateFriendshipDto } from "./dto/update-friendship.dto";



@Injectable()

export class FriendshipRepository {

    constructor(@InjectModel(Friendship.name) private readonly FriendshipModel : Model<Friendship> ){}


    async createFriendRequest(userData: CreateFriendshipDto ){

        const user =  new this.FriendshipModel(userData);
        await user.save();

        return user
    }

    async findRequestById(id: string): Promise<Friendship | null> {
    
        const request = await this.FriendshipModel.findById(id).exec();

        if(!request){
            throw new BadRequestException(`Request with id ${id} not found`);
        }
        return request;

    }
    
    async findByStatus (status: string) : Promise<Friendship[]>{
    
        return await this.FriendshipModel.find({status: status}).exec();
    }
    
    
    
    async update(id: string , RequestData: UpdateFriendshipDto ): Promise<Friendship>{
    
        return await this.FriendshipModel.findByIdAndUpdate(id , RequestData , {new: true}).exec();
    }

    async decline(requestId: string){
    
        return await this.FriendshipModel.findByIdAndDelete(requestId).exec();
    }

    async getPendingRequests(userId: string) {

        return this.FriendshipModel.find({ receiver: userId, status: 'pending' }).populate('sender');
      }

     
    async FindExRequests(receiverId: string , senderId: string){

        return await this.FriendshipModel.findOne({ receiver: receiverId , sender:senderId  }).exec();

    }
      

    async getFriends(userId: string) {

        return this.FriendshipModel.find({ $or: [{ sender: userId }, { receiver: userId }], status: 'accepted', }).populate(['sender', 'receiver']);

      }

    async getFriendsRequests(userId: string) {
        return this.FriendshipModel.find({ receiver: userId, status: "pending" }) 
          .populate("sender", "userName email profilePic")
          .exec();
      }
      


}