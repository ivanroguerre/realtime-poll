import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import { PollItem } from 'shared';
import { PollSetupInfo } from 'src/common/types';
import { buildPollStartMessageContent, discordRequest } from 'src/common/utils';

@Injectable()
export class PollService {
  constructor(private configService: ConfigService) {}

  private items: PollItem[];
  private title: PollSetupInfo['title'];

  getItems() {
    return this.items;
  }

  getTitle() {
    return this.title;
  }

  async pollFinish() {
    const endpoint = `/channels/${this.configService.get(
      'CHANNEL_ID',
    )}/messages`;
    const message = { content: 'La votación ha finalizado' };
    await discordRequest(
      this.configService.get('API_BASE_URL'),
      endpoint,
      { method: 'POST', body: message },
      this.configService.get('DISCORD_TOKEN'),
    );
  }

  async pollSetup(pollSetupInfo: PollSetupInfo) {
    this.items = pollSetupInfo.items;
    this.title = pollSetupInfo.title;
    const endpoint = `/channels/${this.configService.get(
      'CHANNEL_ID',
    )}/messages`;
    const message = {
      content: buildPollStartMessageContent(
        pollSetupInfo['items'],
        pollSetupInfo['title'],
      ),
    };
    await discordRequest(
      this.configService.get('API_BASE_URL'),
      endpoint,
      { method: 'POST', body: message },
      this.configService.get('DISCORD_TOKEN'),
    );
  }

  vote(id: PollItem['id']) {
    const votedItem = this.items.find((item) => item.id === id);
    votedItem.votes = votedItem.votes !== undefined ? votedItem.votes + 1 : 1;
    return votedItem.votes;
  }
}
