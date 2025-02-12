import { Type } from "class-transformer";
import { IsNotEmpty , IsString , IsDate, IsOptional } from "class-validator";


export class CreateTeamDto {

@IsString()
@IsNotEmpty()
name: string ;

@IsString()
@IsNotEmpty()
captain: string;

@IsOptional()
@IsString()
logo? : string ;



}
