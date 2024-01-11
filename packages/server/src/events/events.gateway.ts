import { Server } from 'socket.io';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { PollItem } from 'shared';
import { PollService } from 'src/poll/poll.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class EventsGateway {
  constructor(private pollService: PollService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('poll-started')
  handlePollStarted(@MessageBody() items: PollItem[]) {
    this.pollService.setupPoll(items);
    return { status: 'ok' };
  }
}
