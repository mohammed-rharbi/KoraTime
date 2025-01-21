import { Type } from "class-transformer";
import { IsNotEmpty , IsString , IsDate, IsOptional } from "class-validator";


export class CreateUserDto {

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
