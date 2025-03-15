import { Prop, Schema ,SchemaFactory } from "@nestjs/mongoose";
import { Document , Types } from "mongoose";


@Schema()
export class TeamInvition extends Document {

    @Prop({ type: Types.ObjectId, ref: 'Team', required: true })
    team: Types.ObjectId;
    
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    player: Types.ObjectId;

    @Prop({ enum: ['pending', 'accepted', 'declined'], default: 'pending' })
    status: string;

    @Prop({ default: Date.now })
    createdAt: Date; 

}

export const TeamInvitionSchema = SchemaFactory.createForClass(TeamInvition)
