import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamRepository } from './team.repository';

@Injectable()
export class TeamService {


  constructor(private readonly TeamRepository: TeamRepository ){}
  

  async createTeam(createTeamDto: CreateTeamDto) {

    return await this.TeamRepository.createTeam(createTeamDto);
  }

  async findAllTeams() {

    return await this.TeamRepository.getAllTeams();
  }

  async findOneTeam(id: string) {

    return await this.TeamRepository.findTeamById(id);
  }

  async updateTeam(id: string, updateTeamDto: UpdateTeamDto) {

    return await this.TeamRepository.updateTeam(id , updateTeamDto);
  }

  async removeTeam(id: string) {
    
    return await this.TeamRepository.deleteTeam(id);
  }
}
