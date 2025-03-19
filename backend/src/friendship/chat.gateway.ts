import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody , ConnectedSocket } from '@nestjs/websockets';
import { Server , Socket } from 'socket.io';
import { FriendshipService } from './friendship.service';

@WebSocketGateway({ cors: true })
export class ChatGateway {

  @WebSocketServer() server: Server;

  constructor(private readonly chatService : FriendshipService) {}


  private activeUsers = new Map();

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinChat')
  handleJoinChat(@MessageBody() chatId: string, @ConnectedSocket() client: Socket) {
    client.join(chatId);
  }


  @SubscribeMessage('sendMessage')
  async handleSendMessage(@MessageBody() data: { chatId: string; sender: string; content: string }) {
    const message = await this.chatService.sendMessage(data.chatId, data.sender, data.content);
    this.server.to(data.chatId).emit('newMessage', message);
    return message;
  }
}
