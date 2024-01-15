import { Injectable } from '@nestjs/common';

import { PollItem } from 'shared';
import { PollSetupInfo } from 'src/common/types';

@Injectable()
export class PollService {
  items: PollItem[];
  title: PollSetupInfo['title'];

  pollSetup(pollSetupInfo: PollSetupInfo) {
    this.items = pollSetupInfo.items;
    this.title = pollSetupInfo.title;
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
