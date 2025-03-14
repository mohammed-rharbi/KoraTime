import { Module } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { FriendshipController } from './friendship.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendshipSchema , Friendship } from './entities/friendship.entity';
import { FriendshipRepository } from './friendship.repository';
import { AuthModule } from 'src/auth/auth.module';
import { FriendGateway } from './friend.gateway';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Friendship.name , schema: FriendshipSchema },
    ]),
  ],
  controllers: [FriendshipController],
  providers: [FriendshipService , FriendshipRepository , FriendGateway],
})
export class FriendshipModule {}
