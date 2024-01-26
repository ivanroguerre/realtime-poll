import { Module } from '@nestjs/common';
import { PollService } from './poll.service';
import { PollController } from './poll.controller';

@Module({
  exports: [PollService],
  providers: [PollService],
  controllers: [PollController],
})
export class PollModule {}
