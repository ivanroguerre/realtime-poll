import { Server } from 'socket.io';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { PollService } from 'src/poll/poll.service';
import { PollSetupInfo } from 'src/common/types';

@WebSocketGateway({ cors: { origin: '*' } })
export class EventsGateway {
  constructor(private pollService: PollService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('poll-setup')
  handlePollSetup(@MessageBody() pollSetupInfo: PollSetupInfo) {
    this.pollService.pollSetup(pollSetupInfo);
    return { status: 'ok' };
  }
}
