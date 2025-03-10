import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  async findOne(@Param('id') id: string) {
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
}
