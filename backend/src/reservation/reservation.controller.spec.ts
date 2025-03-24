import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';


describe('ReservationController', () => {
    let reservationController: ReservationController;
    let reservationService: ReservationService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ReservationController],
            providers: [
                {
                    provide: ReservationService,
                    useValue: {
                        createReservation: jest.fn(),
                    },
                },
            ],
        }).compile();

        reservationController = module.get<ReservationController>(ReservationController);
        reservationService = module.get<ReservationService>(ReservationService);
    });

    it('should be defined', () => {
        expect(reservationController).toBeDefined();
    });
    describe('ReservationController', () => {
      let reservationController: ReservationController;
      let reservationService: ReservationService;

      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          controllers: [ReservationController],
          providers: [
            {
              provide: ReservationService,
              useValue: {
                createReservation: jest.fn(),
                getAllReservations: jest.fn(),
                findReservation: jest.fn(),
                getUserReservations: jest.fn(),
                update: jest.fn(),
                removeReservation: jest.fn(),
              },
            },
          ],
        }).compile();

        reservationController = module.get<ReservationController>(ReservationController);
        reservationService = module.get<ReservationService>(ReservationService);
      });

      it('should be defined', () => {
        expect(reservationController).toBeDefined();
      });

      it('should create a reservation', async () => {
        const createReservationDto: CreateReservationDto = {
            userId: '1',
            date: new Date(),
            fieldId: '2',
            startTime:'20:00',
        };
        await reservationController.createReservation(createReservationDto);
        expect(reservationService.createReservation).toHaveBeenCalledWith(createReservationDto);
      });

      it('should get all reservations', async () => {
        await reservationController.findAllReservations();
        expect(reservationService.getAllReservations).toHaveBeenCalled();
      });

      it('should get one reservation by id', async () => {
        const id = '1';
        await reservationController.findOneReservation(id);
        expect(reservationService.findReservation).toHaveBeenCalledWith(id);
      });

      it('should get user reservations by user id', async () => {
        const id = '1';
        await reservationController.findUsersReservations(id);
        expect(reservationService.getUserReservations).toHaveBeenCalledWith(id);
      });

      it('should update a reservation', async () => {
        const id = '1';
        const updateReservationDto: UpdateReservationDto = { /* fill with appropriate properties */ };
        await reservationController.updateReservation(id, updateReservationDto);
        expect(reservationService.update).toHaveBeenCalledWith(id, updateReservationDto);
      });

      it('should delete a reservation', async () => {
        const id = '1';
        await reservationController.deleteReservation(id);
        expect(reservationService.removeReservation).toHaveBeenCalledWith(id);
      });
    });
});
