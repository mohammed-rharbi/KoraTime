import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TeamModule } from './team/team.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationModule } from './reservation/reservation.module';
import { FieldsModule } from './fields/fields.module';
import { ScheduleModule } from '@nestjs/schedule';
import { FriendshipModule } from './friendship/friendship.module';
import "dotenv/config"

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ScheduleModule.forRoot(),
    AuthModule, 
    TeamModule,
    ReservationModule,
    FieldsModule,
    FriendshipModule,  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
