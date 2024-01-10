import { Injectable } from '@nestjs/common';

import { PollItem } from 'shared';

@Injectable()
export class PollService {
  pollItems: PollItem[];

  setupPoll(pollItems: PollItem[]) {
    this.pollItems = pollItems;
    console.log(this.pollItems);
  }
}
