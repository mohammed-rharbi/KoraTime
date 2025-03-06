import { IsNotEmpty , IsOptional , IsString , MinLength, MaxLength, IsEmail } from "class-validator";


export class CreateManagerDto {

@IsString()
@IsNotEmpty()       
userName: string ;

@IsString()
@IsNotEmpty()
@IsEmail()
email: string;

@IsNotEmpty()
@IsString()
password: string;

@IsString()
@IsNotEmpty()
phoneNumber: string;

@IsNotEmpty()
@IsString()
@IsOptional()
profilePic?: string;

@IsNotEmpty()
@IsString()
location: string;


}
