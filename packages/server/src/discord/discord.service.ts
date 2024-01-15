import { Injectable } from '@nestjs/common';

import { PollService } from 'src/poll/poll.service';

@Injectable()
export class DiscordService {
  constructor(private pollService: PollService) {}

  getPollOptions() {
    return this.pollService.test().map((pollItem) => ({
      label: pollItem.value,
      value: pollItem.id,
    }));
  }
}
