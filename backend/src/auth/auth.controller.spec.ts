import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { CreateUserDto } from './dto/create-auth.dto';
import { LoginUserDto } from './dto/login-auth.dto';
import { StartingUserDto } from './dto/starting-auth.dto';
import { CreateManagerDto } from './dto/manager-auth.dto';
import { BadRequestException } from '@nestjs/common';


import { User } from './entities/auth.entity';


describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockUser: Partial<User> = {
    _id: '1',
    userName: 'testuser',
    email: 'test@example.com',
    password: 'password123',
    phoneNumber: '1234567890',
    location: 'Test Location',
    profilePic: 'test.jpg',
    role: 'user',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            registerUser: jest.fn().mockResolvedValue({ message: 'User created', user: mockUser }),
            login: jest.fn().mockResolvedValue({ message: 'Logged in', token: 'jwt.token', user: mockUser }),
            getstarted: jest.fn().mockResolvedValue(mockUser),
            getAll: jest.fn().mockResolvedValue([mockUser]),
            createFieldManager: jest.fn().mockResolvedValue(mockUser),
            getAllManagers: jest.fn().mockResolvedValue([mockUser]),
            getAllPlayers: jest.fn().mockResolvedValue([mockUser]),
            getUserPlayer: jest.fn().mockResolvedValue(mockUser),
            banUser: jest.fn().mockResolvedValue(mockUser),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should call authService.registerUser with DTO and return result', async () => {
      const dto: CreateUserDto = {
        userName: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };

      const result = await controller.create(dto);
      expect(authService.registerUser).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ message: 'User created', user: mockUser });
    });
  });

  describe('login', () => {
    it('should call authService.login with DTO and return result', async () => {
      const dto: LoginUserDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = await controller.login(dto);
      expect(authService.login).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ message: 'Logged in', token: 'jwt.token', user: mockUser });
    });
  });

  describe('getStarted', () => {
    it('should call authService.getstarted with DTO', async () => {
      const dto: StartingUserDto = {
        phoneNumber: '1234567890',
        profilePic: 'test.jpg',
        location: 'Test Location',
      };

      const result = await controller.getStarted(dto);
      expect(authService.getstarted).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const result = await controller.getAllUsers();
      expect(result).toEqual([mockUser]);
    });
  });

  describe('createManager', () => {
    it('should call authService.createFieldManager with DTO', async () => {
      const dto: CreateManagerDto = {
        userName: 'manager',
        email: 'manager@example.com',
        password: 'manager123',
        phoneNumber: '0987654321',
        location: 'Manager Location',
      };

      const result = await controller.createManger(dto);
      expect(authService.createFieldManager).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('banUser', () => {
    it('should call authService.banUser with action and id', async () => {
      const action = 'ban';
      const id = '1';

      const result = await controller.banUser(id, action);
      expect(authService.banUser).toHaveBeenCalledWith(id, action);
      expect(result).toEqual(mockUser);
    });
  });
});