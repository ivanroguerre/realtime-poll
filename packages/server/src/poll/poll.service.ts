import { Injectable } from '@nestjs/common';

import { PollItem } from 'shared';

@Injectable()
export class PollService {
  items: PollItem[];

  setupPoll(items: PollItem[]) {
    this.items = items;
  }
}
