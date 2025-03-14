import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class FriendGateway {
  @WebSocketServer()
  server: Server;


  notifyFriendRequest(userId: string, senderId: string) {
    this.server.to(userId).emit('friendRequest', { senderId });
  }


  notifyFriendAccepted(userId: string, friendId: string) {
    this.server.to(userId).emit('friendAccepted', { friendId });
  }
}
