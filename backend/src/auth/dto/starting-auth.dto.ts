import { IsNotEmpty , IsString } from "class-validator";


export class StartingUserDto {


@IsString()
@IsNotEmpty()
phoneNumber: string;

@IsNotEmpty()
@IsString()
profilePic: string;

@IsNotEmpty()
@IsString()
location: string;

}
