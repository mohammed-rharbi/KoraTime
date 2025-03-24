import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-auth.dto';
import { LoginUserDto } from './dto/login-auth.dto';
import { StartingUserDto } from './dto/starting-auth.dto';
import { CreateManagerDto } from './dto/manager-auth.dto';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { CanActivate } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockUser = {
    _id: '1',
    userName: 'testuser',
    email: 'test@example.com',
    password: 'password123',
    phoneNumber: '1234567890',
    location: 'Test Location',
    profilePic: 'test.jpg',
    role: 'user',
  };

  const mockJwtGuard: CanActivate = { canActivate: jest.fn(() => true) };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            registerUser: jest.fn().mockResolvedValue(mockUser),
            login: jest.fn().mockResolvedValue({ accessToken: 'token' }),
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
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtGuard)
      .compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const dto: CreateUserDto = {
        userName: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };

      expect(await controller.create(dto)).toEqual(mockUser);
      expect(authService.registerUser).toHaveBeenCalledWith(dto);
    });

    it('should throw error for invalid registration', async () => {
      (authService.registerUser as jest.Mock).mockRejectedValueOnce(new Error('Error'));
      await expect(controller.create({} as CreateUserDto)).rejects.toThrow();
    });
  });

  describe('login', () => {
    it('should return access token on successful login', async () => {
      const dto: LoginUserDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = await controller.login(dto);
      expect(result).toEqual({ accessToken: 'token' });
      expect(authService.login).toHaveBeenCalledWith(dto);
    });
  });

  describe('getStarted', () => {
    it('should complete user profile', async () => {
      const dto: StartingUserDto = {
        phoneNumber: '1234567890',
        location: 'Test Location',
        profilePic: 'test.jpg',
      };

      expect(await controller.getStarted(dto)).toEqual(mockUser);
      expect(authService.getstarted).toHaveBeenCalledWith(dto);
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      expect(await controller.getAllUsers()).toEqual([mockUser]);
      expect(authService.getAll).toHaveBeenCalled();
    });
  });

  describe('createManager', () => {
    it('should create a new field manager', async () => {
      const dto: CreateManagerDto = {
        userName: 'manager',
        email: 'manager@example.com',
        password: 'manager123',
        phoneNumber: '0987654321',
        location: 'Manager Location',
      };

      expect(await controller.createManger(dto)).toEqual(mockUser);
      expect(authService.createFieldManager).toHaveBeenCalledWith(dto);
    });
  });

  describe('getAllManagers', () => {
    it('should return all managers', async () => {
      expect(await controller.getAllManagers()).toEqual([mockUser]);
      expect(authService.getAllManagers).toHaveBeenCalled();
    });
  });

  describe('getAllPlayers', () => {
    it('should return all players', async () => {
      expect(await controller.getAllPlayers()).toEqual([mockUser]);
      expect(authService.getAllPlayers).toHaveBeenCalled();
    });
  });

  describe('getPlayer', () => {
    it('should return a specific player', async () => {
      expect(await controller.getPlayer('1')).toEqual(mockUser);
      expect(authService.getUserPlayer).toHaveBeenCalledWith('1');
    });
  });

  describe('banUser', () => {
    it('should ban a user', async () => {
      expect(await controller.banUser('1', 'ban')).toEqual(mockUser);
      expect(authService.banUser).toHaveBeenCalledWith('1', 'ban');
    });

    it('should unban a user', async () => {
      expect(await controller.banUser('1', 'unban')).toEqual(mockUser);
      expect(authService.banUser).toHaveBeenCalledWith('1', 'unban');
    });
  });
});