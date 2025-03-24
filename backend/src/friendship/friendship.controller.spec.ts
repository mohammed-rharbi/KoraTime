import { Test, TestingModule } from '@nestjs/testing';
import { FriendshipController } from './friendship.controller';
import { FriendshipService } from './friendship.service';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { CanActivate } from '@nestjs/common';

const mockJwtAuthGuard: CanActivate = { canActivate: jest.fn(() => true) };

describe('FriendshipController', () => {
  let controller: FriendshipController;
  let service: FriendshipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FriendshipController],
      providers: [
        {
          provide: FriendshipService,
          useValue: {
            sendFriendRequest: jest.fn(),
            acceptFriendRequest: jest.fn(),
            declineRequest: jest.fn(),
            getPendingRequests: jest.fn(),
            getFriendsRequests: jest.fn(),
            getUserFriends: jest.fn(),
            createChat: jest.fn(),
            sendMessage: jest.fn(),
            getChatMessages: jest.fn(),
            getUserChats: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .compile();

    controller = module.get<FriendshipController>(FriendshipController);
    service = module.get<FriendshipService>(FriendshipService);
  });

  it('should call service.sendFriendRequest with correct parameters', async () => {
    const dto = new CreateFriendshipDto();
    await controller.sendFriendRequest(dto);
    expect(service.sendFriendRequest).toHaveBeenCalledWith(dto);
  });

  it('should call service.acceptFriendRequest with correct parameters', () => {
    const requestId = '123';
    controller.acceptFriendRequest(requestId);
    expect(service.acceptFriendRequest).toHaveBeenCalledWith(requestId);
  });

  it('should call service.declineRequest with correct parameters', () => {
    const requestId = '123';
    controller.declineFriendRequest(requestId);
    expect(service.declineRequest).toHaveBeenCalledWith(requestId);
  });

  it('should call service.getPendingRequests with correct parameters', () => {
    const userId = '123';
    controller.getPendingRequests(userId);
    expect(service.getPendingRequests).toHaveBeenCalledWith(userId);
  });

  it('should call service.getFriendsRequests with correct parameters', () => {
    const userId = '123';
    controller.getFriends(userId);
    expect(service.getFriendsRequests).toHaveBeenCalledWith(userId);
  });
});
