import { IsNotEmpty ,IsMongoId } from "class-validator";


export class CreateFriendshipDto {

@IsMongoId()
@IsNotEmpty()       
sender: string ;

@IsMongoId()
@IsNotEmpty()
receiver: string;

}
