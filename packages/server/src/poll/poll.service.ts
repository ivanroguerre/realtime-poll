import { Injectable } from '@nestjs/common';

import { PollItem } from 'shared';

@Injectable()
export class PollService {
  items: PollItem[];

  setupPoll(items: PollItem[]) {
    this.items = items;
  }

  test() {
    const testItems: PollItem[] = [
      {
        id: '1',
        value: 'Test 1',
      },
      {
        id: '2',
        value: 'Test 1',
      },
      {
        id: '3',
        value: 'Test 1',
      },
      {
        id: '4',
        value: 'Test 1',
      },
      {
        id: '5',
        value: 'Test 1',
      },
      {
        id: '6',
        value: 'Test 1',
      },
    ];
    return testItems;
  }
}
