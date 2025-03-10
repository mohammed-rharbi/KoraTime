import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Team } from './entities/team.entity';
import { Model } from 'mongoose';

@Injectable()
export class TeamRepository {

  constructor(@InjectModel(Team.name) private readonly TeamModel : Model<Team> ){}

  async createTeam(createTeamDto: CreateTeamDto) {

    const Team =  new this.TeamModel(createTeamDto);
    await Team.save();

    return Team;
  }

  async getAllTeams() {

    return await this.TeamModel.find().exec();
  }

  async findTeamById(id: string) {

    return await this.TeamModel.findById(id).exec()     ;
  }

  async updateTeam(id: string, updateTeamDto: UpdateTeamDto) {

    return await this.TeamModel.findByIdAndUpdate(id , updateTeamDto , {new:true}).exec();
  }

  async deleteTeam(id: string) {
    
    return await this.TeamModel.findByIdAndDelete(id).exec();
  }

  async leaveTeam(userId: string , teamId: string) {

    return ;
  }
}
