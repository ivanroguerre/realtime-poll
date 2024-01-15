import { Module } from '@nestjs/common';

import { DiscordController } from './discord.controller';
import { DiscordService } from './discord.service';
import { PollModule } from 'src/poll/poll.module';

@Module({
  controllers: [DiscordController],
  imports: [PollModule],
  providers: [DiscordService],
})
export class DiscordModule {}
