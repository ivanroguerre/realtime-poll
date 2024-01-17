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
        return {
          data: {
            content: this.discordService.getPollTitle(),
            components: [
              {
                type: MessageComponentTypes.ACTION_ROW,
                components: [
                  {
                    type: MessageComponentTypes.STRING_SELECT,
                    custom_id: 'vote_choice',
                    options: this.discordService.getPollOptions(),
                    placeholder:
                      'Seleccione el elemento por el cual va a votar',
                  },
                ],
              },
            ],
          },
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        };
      }
    }

    if (type === InteractionType.MESSAGE_COMPONENT) {
      const componentId = data.custom_id;
      if (componentId === 'vote_choice') {
        const userId = request.body.member.user.global_name;
        const pollItemId = data.values[0];
        this.pollService.vote(pollItemId);
        this.eventsGateway.sendPollUpdate(this.pollService.getItems());
        return {
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `¡${userId} votó!`,
          },
        };
      }
    }

    return 'hola';
  }
}
