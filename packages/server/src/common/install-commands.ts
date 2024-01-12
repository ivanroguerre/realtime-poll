import 'dotenv/config';

import { Command } from './types';
import { installGlobalCommands } from './utils';

const VOTE_COMMAND: Command = {
  description: 'Votar por un elemento',
  name: 'vote',
  type: 1,
};

export const ALL_COMMANDS: Command[] = [VOTE_COMMAND];
installGlobalCommands(
  process.env.APP_ID,
  process.env.API_BASE_URL,
  process.env.DISCORD_TOKEN,
  ALL_COMMANDS,
);
