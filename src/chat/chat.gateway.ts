import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
@WebSocketGateway({
  pingTimeout: 60000,
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly authService: AuthService) {}
  @SubscribeMessage('join')
  async joinRoom(client: Socket, data: { accessToken: string }) {
    const userId = await this.authService.getVerifiedUseId(data.accessToken);
    console.log(userId);
  }
}
