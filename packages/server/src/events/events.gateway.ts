import { Server } from 'socket.io';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { PollItem } from 'shared';
import { PollService } from 'src/poll/poll.service';
import { PollSetupInfo } from 'src/common/types';

@WebSocketGateway({ cors: { origin: '*' } })
export class EventsGateway {
  constructor(private pollService: PollService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('poll-finish')
  async handlePollFinish() {
    await this.pollService.pollFinish();
    return { status: 'ok' };
  }

  @SubscribeMessage('poll-setup')
  async handlePollSetup(@MessageBody() pollSetupInfo: PollSetupInfo) {
    await this.pollService.pollSetup(pollSetupInfo);
    return { status: 'ok' };
  }

  sendPollUpdate(id: PollItem['id'], votes: PollItem['votes']) {
    this.server.emit('poll-update', { id, votes });
  }
}
