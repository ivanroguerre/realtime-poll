import { Injectable } from '@nestjs/common';

import { PollItem } from 'shared';
import { PollSetupInfo } from 'src/common/types';

@Injectable()
export class PollService {
  private items: PollItem[];
  private title: PollSetupInfo['title'];

  getItems() {
    return this.items;
  }

  getTitle() {
    return this.title;
  }

  pollSetup(pollSetupInfo: PollSetupInfo) {
    this.items = pollSetupInfo.items;
    this.title = pollSetupInfo.title;
  }

  vote(id: PollItem['id']) {
    const votedItem = this.items.find((item) => item.id === id);
    votedItem.votes = votedItem.votes !== undefined ? votedItem.votes + 1 : 1;
    return votedItem.votes;
  }
}
