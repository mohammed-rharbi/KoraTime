import { Prop, Schema ,SchemaFactory } from "@nestjs/mongoose";
import { Document , Types } from "mongoose";

@Schema()
export class Message extends Document {

    
    @Prop({ type: Types.ObjectId, ref: 'Chat', required: true })
    chat: Types.ObjectId;
        
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    sender: Types.ObjectId;

    @Prop({ type: String, required: true })
    content: string;
    
    @Prop({ default: Date.now })
    createdAt: Date; 
}

export const MessageSchema  = SchemaFactory.createForClass(Message)
    