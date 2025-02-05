import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });


  it('should register new user successfully when valid data is provided', async () => {
    const mockAuthRepository = {
      findByEmail: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue(true)
    };

    const mockJwtService = {
      sign: jest.fn()
    };

    const authService = new AuthService(mockAuthRepository as any, mockJwtService as any);

    const userData = {
      firstName: 'John',
      lastName: 'Doe', 
      email: 'john@test.com',
      password: 'password123'
    };

    const result = await authService.registerUser(userData);

    expect(mockAuthRepository.findByEmail).toHaveBeenCalledWith(userData.email);
    expect(mockAuthRepository.create).toHaveBeenCalled();
    expect(result).toEqual({ message: 'User registered successfully' });
  });


  it('should throw UnauthorizedException when email already exists', async () => {
    const existingUser = {
      email: 'existing@test.com',
      password: 'hashedPassword'
    };

    const mockAuthRepository = {
      findByEmail: jest.fn().mockResolvedValue(existingUser)
    };

    const mockJwtService = {
      sign: jest.fn()
    };

    const authService = new AuthService(mockAuthRepository as any, mockJwtService as any);

    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'existing@test.com',
      password: 'password123'
    };

    await expect(authService.registerUser(userData))
      .rejects
      .toThrow(UnauthorizedException);
  });
  
  
});
