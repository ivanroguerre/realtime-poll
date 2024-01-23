import { Controller, Post, Req } from '@nestjs/common';
import {
  InteractionResponseType,
  InteractionType,
  MessageComponentTypes,
} from 'discord-interactions';

import { DiscordService } from './discord.service';
import { EventsGateway } from 'src/events/events.gateway';
import { PollService } from 'src/poll/poll.service';

@Controller('discord')
export class DiscordController {
  constructor(
    private discordService: DiscordService,
    private pollService: PollService,
    private eventsGateway: EventsGateway,
  ) {}

  @Post('interactions')
  discordInteractions(@Req() request) {
    const { type, id, data } = request.body;

    if (type === InteractionType.PING) {
      return { type: InteractionResponseType.PONG };
    }

    if (type === InteractionType.APPLICATION_COMMAND) {
      const { name } = data;

      if (name === 'votar') {
        if (!this.pollService.getPollActive())
          return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `¡No hay una votación activa!`,
            },
          };
        const userId = request.body.member.user.global_name;
        const pollItemId = data.options[0].value;
        const pollItemVotes = this.pollService.vote(pollItemId);
        this.eventsGateway.sendPollUpdate(pollItemId, pollItemVotes);
        return {
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `¡${userId} votó!`,
          },
        };
      }
    }
  }
}
