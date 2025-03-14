import { Prop, Schema ,SchemaFactory } from "@nestjs/mongoose";
import { Document , Types } from "mongoose";

@Schema()
export class Friendship extends Document {


    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    sender: Types.ObjectId;
  
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    receiver: Types.ObjectId;
  
    @Prop({ enum: ['pending', 'accepted', 'declined'], default: 'pending' })
    status: string;
    
    @Prop({ default: Date.now })
    createdAt: Date; 
}

export const FriendshipSchema = SchemaFactory.createForClass(Friendship)
    