import { Prop, Schema ,SchemaFactory } from "@nestjs/mongoose";
import { Document , Types } from "mongoose";

@Schema()
export class Reservation extends Document {


    @Prop({ type: Types.ObjectId , ref:'User', default: null})
    userId : Types.ObjectId;

    @Prop({ type: Types.ObjectId , ref:'Team', default: null})
    teamId : Types.ObjectId;

    @Prop({ type: Types.ObjectId , ref:'Field', default: null})
    fieldId : Types.ObjectId;

    @Prop({ required: true })
    date: Date;

    @Prop({enum:['confirmed' , 'pending' , 'canceled' , 'completed'] , default:'pending'})
    status: string ;

    @Prop({required:false})
    cancellationReason : string ;

    @Prop({ default: Date.now })
    createdAt: Date; 

}

export const ReservationSchema = SchemaFactory.createForClass(Reservation)
