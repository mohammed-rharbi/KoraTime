import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Controller('team')
export class TeamController {

  constructor(private readonly TeamService: TeamService) {}

  @Post('createTeam')
  async create(@Body() createTeamDto: CreateTeamDto) {

    return await this.TeamService.createTeam(createTeamDto);
    
  }

  @Get('getAll/Teams')
  async findAll() {
    return await this.TeamService.findAllTeams();
  }

  @Get('getTeam/:id')
  async getTeam(@Param('id') id: string) {
    return await this.TeamService.findOneTeam(id);
  }

  @Patch('editeTeam/:id')
  async update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {

    return this.TeamService.updateTeam(id, updateTeamDto);
  }

  @Delete('deletTeam/:id')
  async remove(@Param('id') id: string) {
    return await this.TeamService.removeTeam(id);
  }

  @Post('invitePlayer/:team/:player')
  async invitePlayer(@Param('team') team: string, @Param('player') player: string) {
    return await this.TeamService.invitePlayer(team, player);
  }

  @Post('acceptInvition/:reqId')
  async acceptInvition(@Param('reqId') reqId: string,) {
    return await this.TeamService.acceptTeamInvitation(reqId);
  }

  @Post('declineInvition/:reqId')
  async declineInvition(@Param('reqId') reqId: string,) {
    return await this.TeamService.declineRequest(reqId);
  }


  @Get('getTeamRequests/:id')
  async getTeamRequests(@Param('id') player: string) {
    return await this.TeamService.getPlayerTeamReq(player);
  }

  @Get('getTeamByCapitanId/:id')
  async getTeamByCapitanId(@Param('id') id: string) {
    return await this.TeamService.getTeamByCaptinId(id);
  }

  @Get('getTeamByMember/:id')
  async getTeamMembers(@Param('id') id: string) {
    return await this.TeamService.getTeamByMember(id);
  }



}
