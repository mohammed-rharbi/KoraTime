import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { UpdateFriendshipDto } from './dto/update-friendship.dto';

@Controller('friendship')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @Post('send')
  async sendFriendRequest(@Body() createFriendshipDto: CreateFriendshipDto) {

    return await this.friendshipService.sendFriendRequest(createFriendshipDto);
  }

  @Post('accept/:requestId')
  acceptFriendRequest(@Param('requestId') requestId: string) {
    return this.friendshipService.acceptFriendRequest(requestId);
  }

  @Post('decline/:requestId')
  declineFriendRequest(@Param('requestId') requestId: string) {
    return this.friendshipService.declineRequest(requestId);
  }

  @Get('pending/:userId')
  getPendingRequests(@Param('userId') userId: string) {
    return this.friendshipService.getPendingRequests(userId);
  }

  @Get('getFriendRequests/:userId')
  getFriends(@Param('userId') userId: string) {
    return this.friendshipService.getFriendsRequests(userId);
  }


  @Get('getFriends/:userId')
  getUserFriends(@Param('userId') userId: string) {
    return this.friendshipService.getUserFriends(userId);
  }
  

}
