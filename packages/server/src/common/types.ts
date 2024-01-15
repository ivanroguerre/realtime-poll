import { PollItem } from 'shared';

export type Command = {
  description: string;
  name: string;
  type: number;
};

export type PollSetupInfo = {
  title: string;
  items: PollItem[];
};
