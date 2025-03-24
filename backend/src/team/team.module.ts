import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema } from './entities/team.entity';
import { TeamInvition, TeamInvitionSchema } from './entities/teamInvitaion.entity';
import { TeamRepository } from './team.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[
    AuthModule ,
    MongooseModule.forFeature([{ name : Team.name , schema: TeamSchema }]) ,
    MongooseModule.forFeature([{ name : TeamInvition.name , schema: TeamInvitionSchema }])
  ],
  controllers: [TeamController],
  providers: [TeamService , TeamRepository],
})
export class TeamModule {}
