import { Injectable } from '@nestjs/common';

import { PollService } from 'src/poll/poll.service';

@Injectable()
export class DiscordService {
  constructor(private pollService: PollService) {}

  getPollOptions() {
    return this.pollService.getItems().map((item) => ({
      label: item.value,
      value: item.id,
    }));
  }

  getPollTitle() {
    return this.pollService.getTitle();
  }
}
