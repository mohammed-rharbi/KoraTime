import { Prop, Schema ,SchemaFactory } from "@nestjs/mongoose";
import { Document , Types } from "mongoose";

@Schema()
export class Chat extends Document {

    
    @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
    participants: Types.ObjectId[];

    @Prop({ type: Types.ObjectId, ref: 'Message' })
    lastMessage?: Types.ObjectId;
    
    @Prop({ default: Date.now })
    createdAt: Date; 
}

export const ChatSchema = SchemaFactory.createForClass(Chat)
    