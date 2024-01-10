import { Module } from '@nestjs/common';
import { PollService } from './poll.service';

@Module({
  exports: [PollService],
  providers: [PollService],
})
export class PollModule {}
