import { Module } from '@nestjs/common';

import { DiscordController } from './discord.controller';
import { DiscordService } from './discord.service';
import { PollModule } from 'src/poll/poll.module';
import { EventsModule } from 'src/events/events.module';

@Module({
  controllers: [DiscordController],
  imports: [PollModule, EventsModule],
  providers: [DiscordService],
})
export class DiscordModule {}
