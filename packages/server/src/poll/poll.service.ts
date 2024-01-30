import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import { PollItem } from 'shared';
import { PollSetupInfo, Voter } from 'src/common/types';
import {
  buildPollFinishMessageContent,
  buildPollStartMessageContent,
  discordRequest,
  getWinners,
} from 'src/common/utils';

@Injectable()
export class PollService {
  constructor(private configService: ConfigService) {}

  private items: PollItem[];
  private pollActive: boolean = false;
  private title: PollSetupInfo['title'];
  private voters: Voter[];
  private setupMessageId;

  getItems() {
    return this.items;
  }

  getPollActive() {
    return this.pollActive;
  }

  getTitle() {
    return this.title;
  }

  async pollFinish() {
    this.pollActive = false;
    const messageContent = buildPollFinishMessageContent(
      getWinners(this.getItems()),
    );
    const endpoint = `/channels/${this.configService.get(
      'CHANNEL_ID',
    )}/messages`;
    const message = { content: messageContent };
    await discordRequest(
      this.configService.get('API_BASE_URL'),
      endpoint,
      { method: 'POST', body: message },
      this.configService.get('DISCORD_TOKEN'),
    );
  }

  async pollSetup(pollSetupInfo: PollSetupInfo) {
    this.pollActive = true;
    this.voters = [];
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
    const messageRequest = await discordRequest(
      this.configService.get('API_BASE_URL'),
      endpoint,
      { method: 'POST', body: message },
      this.configService.get('DISCORD_TOKEN'),
    );
    console.log(await messageRequest.json());
  }

  vote(id: PollItem['id'], voterId: Voter['voterId']) {
    const voter = this.voters.find((_voter) => _voter.voterId == voterId);
    const votedItem = this.items.find((item) => item.id === id);
    let alreadyVotedItem;
    if (voter === undefined) {
      this.voters.push({ itemId: id, voterId });
    } else {
      alreadyVotedItem = this.items.find((item) => item.id === voter.itemId);
      alreadyVotedItem.votes = alreadyVotedItem.votes - 1;
      voter.itemId = id;
    }
    votedItem.votes = votedItem.votes !== undefined ? votedItem.votes + 1 : 1;
    return {
      votedItem: {
        id: votedItem.id,
        votes: votedItem.votes,
      },
      alreadyVotedItem: {
        id: alreadyVotedItem !== undefined ? alreadyVotedItem.id : undefined,
        votes:
          alreadyVotedItem !== undefined ? alreadyVotedItem.votes : undefined,
      },
    };
  }
}
