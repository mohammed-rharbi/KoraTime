import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { FriendshipRepository } from './friendship.repository';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { AuthRepository } from 'src/auth/auth.repository';
import { FriendGateway } from './friend.gateway';

@Injectable()
export class FriendshipService {
  constructor( private readonly FriendshipRepository: FriendshipRepository , private readonly UserRepo: AuthRepository ,
    private readonly friendGateway : FriendGateway
  ) {}
  

  async sendFriendRequest(requestData: CreateFriendshipDto) {

    if (requestData.receiver === requestData.sender) {
      throw new BadRequestException("You can't send a request to yourself.");
    }

    const requestExists = await this.FriendshipRepository.FindExRequests(requestData.receiver, requestData.sender);

    if(requestExists){
      throw new BadRequestException("You already sent a request to this user.");
    }

    const friendRequest = await this.FriendshipRepository.createFriendRequest(requestData);

    this.friendGateway.notifyFriendRequest(requestData.sender , requestData.receiver);

    return friendRequest;
  }

  async acceptFriendRequest(requestId: string) {

    const request = await this.FriendshipRepository.findRequestById(requestId);

    if (!request) {
      throw new NotFoundException('Friend request not found.');
    }

    if (request.status !== 'pending') {
      throw new BadRequestException('Request already handled.');
    }

    request.status = 'accepted';
    await request.save();

    await this.UserRepo.addFriend(request.sender.toString(), request.receiver.toString());

    this.friendGateway.notifyFriendAccepted(request.sender.toString(), request.receiver.toString());

    return request;
  }

  async getPendingRequests(userId: string) {

    const requests = await this.FriendshipRepository.getPendingRequests(userId);

    if (!requests) {
      throw new NotFoundException('No pending requests found.');
    }

    return requests;
  }

  async getFriends(userId: string) {

    const friends = await this.FriendshipRepository.getFriends(userId);

    if (!friends) {
      throw new NotFoundException('No friends found.');
    }

    return friends;
  }


  async getFriendsRequests(userId: string) {

    const friends = await this.FriendshipRepository.getFriendsRequests(userId);

    if (!friends || friends.length === 0) {
      throw new NotFoundException('No friends requests found.');
    }

    return friends;
  }

  async declineRequest(requestId: string) {

    const request = await this.FriendshipRepository.findRequestById(requestId);

    if (!request) {
      throw new NotFoundException('request not found.');
    }

    request.status = 'declined';
    await request.save();

    return await this.FriendshipRepository.decline(requestId);
  }

  async getUserFriends(userId:string){

    
    const user = await this.UserRepo.findById(userId);

    if(!user){
      throw new NotFoundException('User not found');
    }

    return user.friends;

  }
}
