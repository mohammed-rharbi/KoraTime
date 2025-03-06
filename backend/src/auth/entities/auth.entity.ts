import { Prop, Schema ,SchemaFactory } from "@nestjs/mongoose";
import { Document , Types } from "mongoose";

@Schema()
export class User extends Document {


    @Prop({required:true})
    userName: string ;

    
    @Prop({required:true})
    email: string ;

    
    @Prop({required:true})
    password: string ;


    @Prop({default: null})
    phoneNumber: string ; 

    @Prop({default: null})
    location: string ;


    @Prop()
    profilePic: string ; 

    
    @Prop({enum:['admin' , 'user' , 'fieldManager'] , default:'user'})
    role: string ;


    @Prop({ type: Types.ObjectId , ref:'Team', default: null})
    team : Types.ObjectId

    @Prop({default: false})
    isCaptin: boolean ;


    @Prop({ type: [Types.ObjectId] , ref:'Reservation', default: []})
    reservations : Types.ObjectId[]


    @Prop({ type: [Types.ObjectId] , ref:'Chat', default: []})
    chats : Types.ObjectId[]

    
    @Prop({default: false})
    isActive: boolean ;

    @Prop({default: false})
    isBand: boolean ;

}

export const UserSchema = SchemaFactory.createForClass(User)
