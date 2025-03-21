// import { Test, TestingModule } from '@nestjs/testing';
// import { ReservationController } from './reservation.controller';
// import { ReservationService } from './reservation.service';
// import { CreateReservationDto } from './dto/create-reservation.dto';
// import { UpdateReservationDto } from './dto/update-reservation.dto';

// describe('ReservationController', () => {
//     let controller: ReservationController;
//     let service: ReservationService;

//     beforeEach(async () => {
//         const module: TestingModule = await Test.createTestingModule({
//             controllers: [ReservationController],
//             providers: [
//                 {
//                     provide: ReservationService,
//                     useValue: {
//                         createReservation: jest.fn(),
//                         getAllReservations: jest.fn(),
//                         findReservation: jest.fn(),
//                         getUserReservations: jest.fn(),
//                         update: jest.fn(),
//                         removeReservation: jest.fn(),
//                     },
//                 },
//             ],
//         }).compile();

//         controller = module.get<ReservationController>(ReservationController);
//         service = module.get<ReservationService>(ReservationService);
//     });

//     it('should be defined', () => {
//         expect(controller).toBeDefined();
//     });

//     describe('createReservation', () => {
//         it('should create a reservation', async () => {
//             const createReservationDto: CreateReservationDto = { /* mock data */ };
//             const result = { /* mock result */ };
//             jest.spyOn(service, 'createReservation').mockResolvedValue(result);

//             expect(await controller.createReservation(createReservationDto)).toBe(result);
//             expect(service.createReservation).toHaveBeenCalledWith(createReservationDto);
//         });
//     });

//     describe('findAllReservations', () => {
//         it('should return an array of reservations', async () => {
//             const result = [/* mock result */];
//             jest.spyOn(service, 'getAllReservations').mockResolvedValue(result);

//             expect(await controller.findAllReservations()).toBe(result);
//             expect(service.getAllReservations).toHaveBeenCalled();
//         });
//     });

//     describe('findOneReservation', () => {
//         it('should return a single reservation', async () => {
//             const result = { /* mock result */ };
//             jest.spyOn(service, 'findReservation').mockResolvedValue(result);

//             expect(await controller.findOneReservation('1')).toBe(result);
//             expect(service.findReservation).toHaveBeenCalledWith('1');
//         });
//     });

//     describe('findUsersReservations', () => {
//         it('should return an array of user reservations', async () => {
//             const result = [/* mock result */];
//             jest.spyOn(service, 'getUserReservations').mockResolvedValue(result);

//             expect(await controller.findUsersReservations('1')).toBe(result);
//             expect(service.getUserReservations).toHaveBeenCalledWith('1');
//         });
//     });

//     describe('updateReservation', () => {
//         it('should update a reservation', async () => {
//             const updateReservationDto: UpdateReservationDto = { /* mock data */ };
//             const result = { /* mock result */ };
//             jest.spyOn(service, 'update').mockResolvedValue(result);

//             expect(await controller.updateReservation('1', updateReservationDto)).toBe(result);
//             expect(service.update).toHaveBeenCalledWith('1', updateReservationDto);
//         });
//     });

//     describe('deleteReservation', () => {
//         it('should delete a reservation', async () => {
//             const result = { /* mock result */ };
//             jest.spyOn(service, 'removeReservation').mockResolvedValue(result);

//             expect(await controller.deleteReservation('1')).toBe(result);
//             expect(service.removeReservation).toHaveBeenCalledWith('1');
//         });

//         describe('ReservationController', () => {
//             let controller: ReservationController;
//             let service: ReservationService;

//             beforeEach(async () => {
//                 const module: TestingModule = await Test.createTestingModule({
//                     controllers: [ReservationController],
//                     providers: [
//                         {
//                             provide: ReservationService,
//                             useValue: {
//                                 createReservation: jest.fn(),
//                                 getAllReservations: jest.fn(),
//                                 findReservation: jest.fn(),
//                                 getUserReservations: jest.fn(),
//                                 update: jest.fn(),
//                                 removeReservation: jest.fn(),
//                             },
//                         },
//                     ],
//                 }).compile();

//                 controller = module.get<ReservationController>(ReservationController);
//                 service = module.get<ReservationService>(ReservationService);
//             });

//             it('should be defined', () => {
//                 expect(controller).toBeDefined();
//             });

//             describe('createReservation', () => {
//                 it('should create a reservation', async () => {
//                     const createReservationDto: CreateReservationDto = { /* mock data */ };
//                     const result = { /* mock result */ };
//                     jest.spyOn(service, 'createReservation').mockResolvedValue(result);

//                     expect(await controller.createReservation(createReservationDto)).toBe(result);
//                     expect(service.createReservation).toHaveBeenCalledWith(createReservationDto);
//                 });
//             });

//             describe('findAllReservations', () => {
//                 it('should return an array of reservations', async () => {
//                     const result = [/* mock result */];
//                     jest.spyOn(service, 'getAllReservations').mockResolvedValue(result);

//                     expect(await controller.findAllReservations()).toBe(result);
//                     expect(service.getAllReservations).toHaveBeenCalled();
//                 });
//             });

//             describe('findOneReservation', () => {
//                 it('should return a single reservation', async () => {
//                     const result = { /* mock result */ };
//                     jest.spyOn(service, 'findReservation').mockResolvedValue(result);

//                     expect(await controller.findOneReservation('1')).toBe(result);
//                     expect(service.findReservation).toHaveBeenCalledWith('1');
//                 });
//             });

//             describe('findUsersReservations', () => {
//                 it('should return an array of user reservations', async () => {
//                     const result = [/* mock result */];
//                     jest.spyOn(service, 'getUserReservations').mockResolvedValue(result);

//                     expect(await controller.findUsersReservations('1')).toBe(result);
//                     expect(service.getUserReservations).toHaveBeenCalledWith('1');
//                 });
//             });

//             describe('updateReservation', () => {
//                 it('should update a reservation', async () => {
//                     const updateReservationDto: UpdateReservationDto = { /* mock data */ };
//                     const result = { /* mock result */ };
//                     jest.spyOn(service, 'update').mockResolvedValue(result);

//                     expect(await controller.updateReservation('1', updateReservationDto)).toBe(result);
//                     expect(service.update).toHaveBeenCalledWith('1', updateReservationDto);
//                 });
//             });

//             describe('deleteReservation', () => {
//                 it('should delete a reservation', async () => {
//                     const result = { /* mock result */ };
//                     jest.spyOn(service, 'removeReservation').mockResolvedValue(result);

//                     expect(await controller.deleteReservation('1')).toBe(result);
//                     expect(service.removeReservation).toHaveBeenCalledWith('1');
//                 });
//             });
//         });
//     });
// });