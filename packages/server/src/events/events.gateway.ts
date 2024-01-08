import { Server } from 'socket.io';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ cors: { origin: '*' } })
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  handleMessage() {
    console.log('received');
    this.sendEvents();
    return 'Hello world!';
  }

  sendEvents() {
    this.server.emit('events', 'hahahahahahahah s');
  }
}
