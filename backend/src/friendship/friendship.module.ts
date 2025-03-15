import { Module } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { FriendshipController } from './friendship.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendshipSchema , Friendship } from './entities/friendship.entity';
import { Chat , ChatSchema } from './entities/chat.entity';
import { Message , MessageSchema } from './entities/message.entity';
import { FriendshipRepository } from './friendship.repository';
import { AuthModule } from 'src/auth/auth.module';
import { FriendGateway } from './friend.gateway';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Friendship.name , schema: FriendshipSchema },
    ]),
    MongooseModule.forFeature([
      { name: Chat.name , schema: ChatSchema },
    ]),
    MongooseModule.forFeature([
      { name: Message.name , schema: MessageSchema },
    ]),
  ],
  controllers: [FriendshipController],
  providers: [FriendshipService , FriendshipRepository , FriendGateway],
})
export class FriendshipModule {}
