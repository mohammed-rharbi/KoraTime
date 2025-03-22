import { Test, TestingModule } from '@nestjs/testing';
import { FieldsController } from './fields.controller';
import { FieldsService } from './fields.service';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { FieldRepository } from './fields.repository';
import { CanActivate } from '@nestjs/common';


const mockJwtAuthGuard: CanActivate = { canActivate: jest.fn(() => true) };

describe('FieldsController', () => {
  let controller: FieldsController;
  let service: FieldsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FieldsController],
      providers: [
        {
          provide: FieldsService,
          useValue: {
            create: jest.fn(),
            getAllFields: jest.fn(),
            findFiledById: jest.fn(),
            updateField: jest.fn(),
            deleteField: jest.fn(),
          },
        },
        {
          provide: FieldRepository,
          useValue: {}, // Mock repository if needed
        },
      ],
    })
      .overrideGuard(JwtAuthGuard) // Override the JwtAuthGuard
      .useValue(mockJwtAuthGuard)
      .compile();

    controller = module.get<FieldsController>(FieldsController);
    service = module.get<FieldsService>(FieldsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call FieldsService.create with correct parameters', async () => {
      const createFieldDto: CreateFieldDto = {
        name: 'Test Field',
        location: 'Test Location',
        description: 'Test Description',
        price: '100',
        size: '5v5',
        availability: [],
        status: 'available',
      };
      await controller.create(createFieldDto);
      expect(service.create).toHaveBeenCalledWith(createFieldDto);
    });
  });

  describe('findAllFields', () => {
    it('should call FieldsService.getAllFields', async () => {
      await controller.findAllFields();
      expect(service.getAllFields).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call FieldsService.findFiledById with correct id', async () => {
      const id = 'someId';
      await controller.findOne(id);
      expect(service.findFiledById).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should call FieldsService.updateField with correct parameters', async () => {
      const id = 'someId';
      const updateFieldDto: UpdateFieldDto = { name: 'Updated Field' };
      await controller.update(id, updateFieldDto);
      expect(service.updateField).toHaveBeenCalledWith(id, updateFieldDto);
    });
  });

  describe('remove', () => {
    it('should call FieldsService.deleteField with correct id', async () => {
      const id = 'someId';
      await controller.remove(id);
      expect(service.deleteField).toHaveBeenCalledWith(id);
    });
  });
});
