import { Controller, Get } from '@nestjs/common';

import { PollService } from './poll.service';
import { getWinners } from 'src/common/utils';

@Controller('poll')
export class PollController {
  constructor(private pollService: PollService) {}

  @Get('winners')
  getWinners() {
    const winners = getWinners(this.pollService.getItems());
    return winners;
  }
}
