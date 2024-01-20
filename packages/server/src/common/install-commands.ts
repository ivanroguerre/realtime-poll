import 'dotenv/config';

import { Command } from './types';
import { installGlobalCommands } from './utils';
import {} from 'discord-interactions';

const VOTE_COMMAND: Command = {
  description: 'Votar por un elemento',
  name: 'votar',
  options: [
    {
      description: 'Id del elemento a votar',
      name: 'id',
      required: true,
      type: 3,
    },
  ],
  type: 1,
};

export const ALL_COMMANDS: Command[] = [VOTE_COMMAND];
installGlobalCommands(
  process.env.APP_ID,
  process.env.API_BASE_URL,
  process.env.DISCORD_TOKEN,
  ALL_COMMANDS,
);
