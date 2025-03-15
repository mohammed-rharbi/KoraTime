import { Injectable , BadRequestException, NotFoundException } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamRepository } from './team.repository';
import { AuthRepository } from 'src/auth/auth.repository';

@Injectable()
export class TeamService {


  constructor(private readonly TeamRepository: TeamRepository , private readonly AuthRepo: AuthRepository ){}
  

  async createTeam(createTeamDto: CreateTeamDto) {

       const user = await this.AuthRepo.findById(createTeamDto.captain);
    
        if(!user){
          throw new NotFoundException('no user ben found ')
        }
    
        user.hasTeam = true
        user.save()
    
        const newTeam = await this.TeamRepository.createTeam(createTeamDto);
        return newTeam

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


  async invitePlayer(teamId: string, userId: string) {

  
    const team = await this.TeamRepository.findTeamById(teamId);
  
    if(!team){
      throw new NotFoundException("Team not found.");
    }

    const user = await this.AuthRepo.findById(userId);
    
    if(!user){
      throw new NotFoundException("User not found.");
    }

    if(team.captain.toString() === userId){
      throw new BadRequestException("User is already the captain of the team.");
    }

    if(team.members.includes(new ObjectId(userId))){
      throw new BadRequestException("User already in team.");
    }

    const requestExists = await this.TeamRepository.FindExRequests(teamId, userId);

    if(requestExists){
      throw new BadRequestException("You already sent an invition to this user.");
    }

    return await this.TeamRepository.createInvition(teamId, userId);
  
  
      // this.friendGateway.notifyFriendRequest(requestData.sender , requestData.receiver);
  
    }
  
    async acceptTeamInvitation(requestId: string) {
      const request = await this.TeamRepository.FindTeamRequestById(requestId);
      
      if (!request) {
        throw new NotFoundException('Team invitation not found.');
      }
    
      const team = await this.TeamRepository.findTeamById(request.team.toString());
    
      if (!team) {
        throw new NotFoundException("Team not found.");
      }
    
      const user = await this.AuthRepo.findById(request.player.toString());
    
      if (!user) {
        throw new NotFoundException("User not found.");
      }
    
      if (request.status !== 'pending') {
        throw new BadRequestException('Request already handled.');
      }
    
      team.members.push(request.player);
      await team.save(); 
    
      request.status = 'accepted';
      await request.save();
    
      return request;
    }

    async getPlayerTeamReq(player:string){

      const TeamReq = await this.TeamRepository.getPlayerTeamRequests(player)

      if(!TeamReq){
        throw new NotFoundException("No Teams Requests found");
      }

      return TeamReq

    }

    async getTeamByCaptinId(id:string){

      const Team = await this.TeamRepository.findTeamByUserId(id)

      if(!Team){
        throw new NotFoundException("No Teams Requests found");
      }

      return Team

    }

    async declineRequest(requestId: string) {
      const request = await this.TeamRepository.FindTeamRequestById(requestId);
  
      if (!request) {
        throw new NotFoundException('request not found.');
      }
  
      request.status = 'declined';
      await request.save();
  
      return await this.TeamRepository.decline(requestId);
    }

    async getTeamByMember(id:string){

      const team = await this.TeamRepository.FindTeamByMemberId(id)

      if(!team){
        throw new NotFoundException('Team not found');
      }

      return team;
    }


    
    


}
