import { Prop, Schema ,SchemaFactory } from "@nestjs/mongoose";
import { Document , Types } from "mongoose";


const logo = 'https://i.pinimg.com/736x/62/1e/6f/621e6f89c5161b72adbedda3edc2d29c.jpg';

@Schema()
export class Team extends Document {


    @Prop({required:true})
    name: string ;


    @Prop({default: logo})
    logo: string ;

    @Prop({default: '#FF0000'})
    teamColor:string;
    
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    captain: Types.ObjectId;

    
    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
    members: Types.ObjectId[];
    

    @Prop({ enum:['2-2' , '3-1' , '2-1-1', '1-2-1'] , default: "3-1" }) 
    formation: string;


    
    @Prop({required:true})
    location: string ;


    @Prop({ default: Date.now })
    createdAt: Date; 

}

export const TeamSchema = SchemaFactory.createForClass(Team)
