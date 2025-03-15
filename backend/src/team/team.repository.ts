import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Team } from './entities/team.entity';
import { TeamInvition } from './entities/teamInvitaion.entity';
import { Model } from 'mongoose';

@Injectable()
export class TeamRepository {

  constructor(@InjectModel(Team.name) private readonly TeamModel : Model<Team>,
              @InjectModel(TeamInvition.name) private readonly TeamInvitionModel : Model<TeamInvition> ){}

  async createTeam(createTeamDto: CreateTeamDto) {

    const Team =  new this.TeamModel(createTeamDto);
    await Team.save();

    return Team;
  }

  
  async getAllTeams() {

    return await this.TeamModel.find().exec();
  }

  async findTeamById(id: string) {

    return await this.TeamModel.findById(id).populate('members' , 'userName profilePic email ').exec()     ;
  }

  async findTeamByUserId(id: string) {

    return await this.TeamModel.findOne({captain:id}).populate('members' , 'userName profilePic email ').exec()     ;
  }

  async updateTeam(id: string, updateTeamDto: UpdateTeamDto) {

    return await this.TeamModel.findByIdAndUpdate(id , updateTeamDto , {new:true}).exec();
  }

  async deleteTeam(id: string) {
    
    return await this.TeamModel.findByIdAndDelete(id).exec();
  }


  async createInvition(team: string , player: string) {

    const Invition =  new this.TeamInvitionModel({team , player});
    await Invition.save();

    return Invition;
  }

  async getPlayerTeamRequests(userId: string) {
    return this.TeamInvitionModel.find({ player: userId, status: "pending" }) 
      .populate("team", "name logo location")
      .exec();
  }

  async FindExRequests(teamId: string , playerId: string){

    return await this.TeamInvitionModel.findOne({ team: teamId , player:  playerId  }).exec();

  }

  async FindTeamRequestById(ReqId: string){

    return await this.TeamInvitionModel.findById(ReqId).exec();

  }

  async decline(requestId: string){
    
    return await this.TeamInvitionModel.findByIdAndDelete(requestId).exec();
  }

  async FindTeamByMemberId(UserId: string){

    return await this.TeamModel.findOne({members: UserId}).populate('members','userName profilePic email').exec();

  }

}
