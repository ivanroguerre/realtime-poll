import { Controller, Post, Req } from '@nestjs/common';
import { InteractionResponseType, InteractionType } from 'discord-interactions';

@Controller('discord')
export class DiscordController {
  @Post('interactions')
  discordInteractions(@Req() request) {
    const { type, id, data } = request.body;

    if (type === InteractionType.PING) {
      return { type: InteractionResponseType.PONG };
    }

    return 'hola';
  }
}
