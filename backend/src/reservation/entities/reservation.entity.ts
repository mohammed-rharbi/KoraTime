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
    price: number;

    @Prop({ required: true })
    date: Date;

    @Prop({ required: true })
    startTime: string;

    @Prop({ required: true })
    endTime: string;

    @Prop({enum:['confirmed' , 'pending' , 'canceled' , 'completed'] , default:'pending'})
    status: string ;

    @Prop({required:false})
    cancellationReason : string ;

}

export const ReservationSchema = SchemaFactory.createForClass(Reservation)
