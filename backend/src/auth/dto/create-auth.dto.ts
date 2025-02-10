import { IsNotEmpty , IsString , MinLength, MaxLength, IsEmail } from "class-validator";


export class CreateUserDto {

@IsString()
@IsNotEmpty()       
userName: string ;

@IsString()
@IsNotEmpty()
@IsEmail()
email: string;

@IsNotEmpty()
@IsString()
@MinLength(6)
@MaxLength(15)
password: string;


}
