import { Prop, Schema ,SchemaFactory } from "@nestjs/mongoose";
import { Document , Types } from "mongoose";

@Schema()
export class Field extends Document {


    @Prop({required:true})
    name: string ;
    
    @Prop({default: null})
    location: string ;

    @Prop()
    photo: string ; 

    @Prop({ type: Types.ObjectId , ref:'User', default: null})
    fieldManger : Types.ObjectId;

    @Prop({required:true})
    price: string ;
    
    @Prop({enum:['5v5' , '7v7' , '11v11'] , default:'5v5'})
    size: string ;

    @Prop({default: true})
    lightsAvailable : boolean ;

    @Prop({default: true})
    IsAvailable : boolean ;

    @Prop({ type: [{ userId: Types.ObjectId, rating: Number, comment: String }], default: [] })
    ratings: { userId: Types.ObjectId; rating: number; comment?: string }[];

    @Prop({enum:['available' , 'closed' , 'under maintenance'] , default:'available'})
    status: string ;

}

export const FieldSchema = SchemaFactory.createForClass(Field)
