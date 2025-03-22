import { Test, TestingModule } from '@nestjs/testing';
import { FriendshipController } from './friendship.controller';
import { FriendshipService } from './friendship.service';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { CanActivate } from '@nestjs/common';

// Mock JwtAuthGuard
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
      .overrideGuard(JwtAuthGuard) // Override the JwtAuthGuard
      .useValue(mockJwtAuthGuard)
      .compile();

    controller = module.get<FriendshipController>(FriendshipController);
    service = module.get<FriendshipService>(FriendshipService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('sendFriendRequest', () => {
    it('should call service.sendFriendRequest with correct parameters', async () => {
      const dto = new CreateFriendshipDto();
      await controller.sendFriendRequest(dto);
      expect(service.sendFriendRequest).toHaveBeenCalledWith(dto);
    });
  });

  describe('acceptFriendRequest', () => {
    it('should call service.acceptFriendRequest with correct parameters', () => {
      const requestId = '123';
      controller.acceptFriendRequest(requestId);
      expect(service.acceptFriendRequest).toHaveBeenCalledWith(requestId);
    });
  });

  describe('declineFriendRequest', () => {
    it('should call service.declineRequest with correct parameters', () => {
      const requestId = '123';
      controller.declineFriendRequest(requestId);
      expect(service.declineRequest).toHaveBeenCalledWith(requestId);
    });
  });

  describe('getPendingRequests', () => {
    it('should call service.getPendingRequests with correct parameters', () => {
      const userId = '123';
      controller.getPendingRequests(userId);
      expect(service.getPendingRequests).toHaveBeenCalledWith(userId);
    });
  });

  describe('getFriends', () => {
    it('should call service.getFriendsRequests with correct parameters', () => {
      const userId = '123';
      controller.getFriends(userId);
      expect(service.getFriendsRequests).toHaveBeenCalledWith(userId);
    });
  });

  describe('getUserFriends', () => {
    it('should call service.getUserFriends with correct parameters', () => {
      const userId = '123';
      controller.getUserFriends(userId);
      expect(service.getUserFriends).toHaveBeenCalledWith(userId);
    });
  });

  describe('createChat', () => {
    it('should call service.createChat with correct parameters', () => {
      const startUser = 'user1';
      const endUser = 'user2';
      controller.createChat(startUser, endUser);
      expect(service.createChat).toHaveBeenCalledWith(startUser, endUser);
    });
  });

  describe('sendMessage', () => {
    it('should call service.sendMessage with correct parameters', () => {
      const chatId = 'chat1';
      const sender = 'user1';
      const message = 'Hello';
      controller.sendMessage(chatId, sender, message);
      expect(service.sendMessage).toHaveBeenCalledWith(chatId, sender, message);
    });
  });

  describe('getChat', () => {
    it('should call service.getChatMessages with correct parameters', () => {
      const chatId = 'chat1';
      controller.getChat(chatId);
      expect(service.getChatMessages).toHaveBeenCalledWith(chatId);
    });
  });

  describe('getUserChats', () => {
    it('should call service.getUserChats with correct parameters', () => {
      const userId = 'user1';
      controller.getUserChats(userId);
      expect(service.getUserChats).toHaveBeenCalledWith(userId);
    });
  });
});
