import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { AuthRepository } from 'src/auth/auth.repository';

@Controller('team')
export class TeamController {

  constructor(private readonly TeamService: TeamService , private readonly UserRepo: AuthRepository) {}

  @Post('createTeam')

 async create(@Body() createTeamDto: CreateTeamDto) {

    const user = await this.UserRepo.findById(createTeamDto.captain);

    if(!user){
      throw new NotFoundException('no user ben found ')
    }

    user.hasTeam = true
    user.save()

    const newTeam = await this.TeamService.createTeam(createTeamDto);
    return newTeam
    
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
