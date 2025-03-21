// import { Test, TestingModule } from '@nestjs/testing';
// import { FieldsService } from './fields.service';
// import { FieldRepository } from './fields.repository';
// import { NotFoundException } from '@nestjs/common';
// import { CreateFieldDto } from './dto/create-field.dto';
// import { UpdateFieldDto } from './dto/update-field.dto';

// describe('FieldsService', () => {
//   let service: FieldsService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [FieldsService],
//     }).compile();

//     service = module.get<FieldsService>(FieldsService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   describe('FieldsService', () => {
//     let service: FieldsService;
//     let repository: FieldRepository;

//     beforeEach(async () => {
//       const module: TestingModule = await Test.createTestingModule({
//         providers: [
//           FieldsService,
//           {
//             provide: FieldRepository,
//             useValue: {
//               create: jest.fn(),
//               findAll: jest.fn(),
//               findById: jest.fn(),
//               update: jest.fn(),
//               delete: jest.fn(),
//               checkAndUpdateExpiredSlots: jest.fn(),
//             },
//           },
//         ],
//       }).compile();

//       service = module.get<FieldsService>(FieldsService);
//       repository = module.get<FieldRepository>(FieldRepository);
//     });

//     it('should be defined', () => {
//       expect(service).toBeDefined();
//     });

//     describe('create', () => {
//       it('should create a new field with availability', async () => {
//         const createFieldDto: CreateFieldDto = { 
//           name: 'Test Field',
//           location: 'Test Location',
//           description: 'Test Description',
//           price: '100',
//           size: '5v5',
//           availability: [],
//           status: 'available'
//         };

//         const createdField = { 
//           id: '1', 
//           ...createFieldDto, 
//           availability: [], 
//           fieldManager: 'managerId', 
//           isAvailable: true, 
//           createdAt: new Date(), 
//           _id: '1' 
//         };

//         jest.spyOn(repository, 'create').mockResolvedValue(createFieldDto);

//         const result = await service.create(createFieldDto);

//         expect(result).toEqual(createdField);
//         expect(repository.create).toHaveBeenCalledWith(expect.objectContaining(createFieldDto));
//       });
//     });

//     describe('getAllFields', () => {
//       it('should return all fields', async () => {
//         const fields = [{ id: '1', name: 'Test Field' }];
//         jest.spyOn(repository, 'findAll').mockResolvedValue(fields);

//         const result = await service.getAllFields();

//         expect(result).toEqual(fields);
//         expect(repository.findAll).toHaveBeenCalled();
//       });

//       it('should throw NotFoundException if no fields are found', async () => {
//         jest.spyOn(repository, 'findAll').mockResolvedValue([]);

//         await expect(service.getAllFields()).rejects.toThrow(NotFoundException);
//       });
//     });

//     describe('findFiledById', () => {
//       it('should return a field by id', async () => {
//         const field = { id: '1', name: 'Test Field' };
//         jest.spyOn(repository, 'findById').mockResolvedValue(field);

//         const result = await service.findFiledById('1');

//         expect(result).toEqual(field);
//         expect(repository.findById).toHaveBeenCalledWith('1');
//       });

//       it('should throw NotFoundException if field is not found', async () => {
//         jest.spyOn(repository, 'findById').mockResolvedValue(null);

//         await expect(service.findFiledById('1')).rejects.toThrow(NotFoundException);
//       });
//     });

//     describe('updateField', () => {
//       it('should update a field', async () => {
//         const updateFieldDto: UpdateFieldDto = { name: 'Updated Field' };
//         const updatedField = { id: '1', ...updateFieldDto };
//         jest.spyOn(repository, 'update').mockResolvedValue(updatedField);

//         const result = await service.updateField('1', updateFieldDto);

//         expect(result).toEqual(updatedField);
//         expect(repository.update).toHaveBeenCalledWith('1', updateFieldDto);
//       });
//     });

//     describe('deleteField', () => {
//       it('should delete a field', async () => {
//         const deletedField = { id: '1', name: 'Deleted Field' };
//         jest.spyOn(repository, 'delete').mockResolvedValue(deletedField);

//         const result = await service.deleteField('1');

//         expect(result).toEqual(deletedField);
//         expect(repository.delete).toHaveBeenCalledWith('1');
//       });
//     });

//     describe('handleExpiredSlots', () => {
//       it('should check and update expired slots', async () => {
//         jest.spyOn(repository, 'checkAndUpdateExpiredSlots').mockResolvedValue(null);

//         await service.handleExpiredSlots();

//         expect(repository.checkAndUpdateExpiredSlots).toHaveBeenCalled();
//       });
//     });
//   });


// });
