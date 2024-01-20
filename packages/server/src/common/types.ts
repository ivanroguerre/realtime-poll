import { PollItem } from 'shared';

export type Command = {
  description: string;
  name: string;
  options: CommandOption[];
  type: number;
};

type CommandOption = {
  description: string;
  name: string;
  required: boolean;
  type: number;
};

export type PollSetupInfo = {
  title: string;
  items: PollItem[];
};
