// import { Test, TestingModule } from '@nestjs/testing';
// import { ReservationController } from './reservation.controller';
// import { ReservationService } from './reservation.service';
// import { CreateReservationDto } from './dto/create-reservation.dto';
// import { UpdateReservationDto } from './dto/update-reservation.dto';

// describe('ReservationController', () => {
//   let reservationController: ReservationController;
//   let reservationService: ReservationService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [ReservationController],
//       providers: [
//         {
//           provide: ReservationService,
//           useValue: {
//             createReservation: jest.fn(),
//             getAllReservations: jest.fn(),
//             findReservation: jest.fn(),
//             getUserReservations: jest.fn(),
//             update: jest.fn(),
//             removeReservation: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     reservationController = module.get<ReservationController>(ReservationController);
//     reservationService = module.get<ReservationService>(ReservationService);
//   });

//   it('should be defined', () => {
//     expect(reservationController).toBeDefined();
//   });

//   describe('createReservation', () => {
//     it('should create a reservation', async () => {
//       const createReservationDto: CreateReservationDto = {
//         userId: 'user1',
//         fieldId: 'field1',
//         date: new Date(),
//         startTime: '10:00',
//       };
//       const result = { /* fill with expected result */ };
//       jest.spyOn(reservationService, 'createReservation').mockResolvedValue(result);

//       expect(await reservationController.createReservation(createReservationDto)).toBe(result);
//     });
//   });

//   describe('findAllReservations', () => {
//     it('should return an array of reservations', async () => {
//       const result = [/* fill with expected result */];
//       jest.spyOn(reservationService, 'getAllReservations').mockResolvedValue(result);

//       expect(await reservationController.findAllReservations()).toBe(result);
//     });
//   });

//   describe('findOneReservation', () => {
//     it('should return a single reservation', async () => {
//       const result = { /* fill with expected result */ };
//       jest.spyOn(reservationService, 'findReservation').mockResolvedValue(result);

//       expect(await reservationController.findOneReservation('1')).toBe(result);
//     });
//   });

//   describe('findUsersReservations', () => {
//     it('should return an array of user reservations', async () => {
//       const result = [/* fill with expected result */];
//       jest.spyOn(reservationService, 'getUserReservations').mockResolvedValue(result);

//       expect(await reservationController.findUsersReservations('1')).toBe(result);
//     });
//   });

//   describe('updateReservation', () => {
//     it('should update a reservation', async () => {
//       const updateReservationDto: UpdateReservationDto = { /* fill with appropriate data */ };
//       const result = { /* fill with expected result */ };
//       jest.spyOn(reservationService, 'update').mockResolvedValue(result);

//       expect(await reservationController.updateReservation('1', updateReservationDto)).toBe(result);
//     });
//   });

//   describe('deleteReservation', () => {
//     it('should delete a reservation', async () => {
//       const result = { /* fill with expected result */ };
//       jest.spyOn(reservationService, 'removeReservation').mockResolvedValue(result);

//       expect(await reservationController.deleteReservation('1')).toBe(result);
//     });
//   });
// });