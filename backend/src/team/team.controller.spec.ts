import { Test, TestingModule } from '@nestjs/testing';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';


describe('TeamController', () => {
  let controller: TeamController;
  let service: TeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamController],
      providers: [
        {
          provide: TeamService,
          useValue: {
            createTeam: jest.fn(),
            findAllTeams: jest.fn(),
            findOneTeam: jest.fn(),
            updateTeam: jest.fn(),
            removeTeam: jest.fn(),
            invitePlayer: jest.fn(),
            acceptTeamInvitation: jest.fn(),
            getPlayerTeamReq: jest.fn(),
            getTeamByCaptinId: jest.fn(),
            getTeamByMember: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TeamController>(TeamController);
    service = module.get<TeamService>(TeamService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a team', async () => {
    const createTeamDto: CreateTeamDto = { name: 'Team A', captain: 'Captain id', location: 'Location Name' };
    await controller.create(createTeamDto);
    expect(service.createTeam).toHaveBeenCalledWith(createTeamDto);
  });

  it('should get all teams', async () => {
    await controller.findAll();
    expect(service.findAllTeams).toHaveBeenCalled();
  });

  it('should get a team by id', async () => {
    const id = '1';
    await controller.getTeam(id);
    expect(service.findOneTeam).toHaveBeenCalledWith(id);
  });

  it('should update a team', async () => {
    const id = '1';
    const updateTeamDto: UpdateTeamDto = { name: 'Updated Team A' };
    await controller.update(id, updateTeamDto);
    expect(service.updateTeam).toHaveBeenCalledWith(id, updateTeamDto);
  });

  it('should delete a team', async () => {
    const id = '1';
    await controller.remove(id);
    expect(service.removeTeam).toHaveBeenCalledWith(id);
  });

  it('should invite a player to a team', async () => {
    const team = '1';
    const player = '2';
    await controller.invitePlayer(team, player);
    expect(service.invitePlayer).toHaveBeenCalledWith(team, player);
  });

  it('should accept a team invitation', async () => {
    const reqId = '1';
    await controller.acceptInvition(reqId);
    expect(service.acceptTeamInvitation).toHaveBeenCalledWith(reqId);
  });

  it('should get team requests for a player', async () => {
    const player = '1';
    await controller.getTeamRequests(player);
    expect(service.getPlayerTeamReq).toHaveBeenCalledWith(player);
  });

  it('should get a team by captain id', async () => {
    const id = '1';
    await controller.getTeamByCapitanId(id);
    expect(service.getTeamByCaptinId).toHaveBeenCalledWith(id);
  });

  it('should get team members by member id', async () => {
    const id = '1';
    await controller.getTeamMembers(id);
    expect(service.getTeamByMember).toHaveBeenCalledWith(id);
  });
});
