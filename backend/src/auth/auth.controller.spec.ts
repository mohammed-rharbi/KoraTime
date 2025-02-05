import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  
     it('should successfully process file upload and user data when valid inputs are provided', async () => {

      const mockFile = {
        path: 'uploads/test-123.jpg'
      } as Express.Multer.File;

      const mockUserData = {
        id: 'user123',
        phoneNumber: '+1234567890'
      };

      const mockResponse = {
        success: true
      };

      const authService = {
        getstarted: jest.fn().mockResolvedValue(mockResponse)
      };

      const controller = new AuthController(authService as any);

      const result = await controller.getStarted(mockFile, mockUserData);

      expect(authService.getstarted).toHaveBeenCalledWith(
        mockUserData.phoneNumber,
        mockFile.path,
        mockUserData.id
      );

      expect(result).toEqual(mockResponse);

    });
});
