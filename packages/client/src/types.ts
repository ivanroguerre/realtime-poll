export enum PollStatus {
  Setup,
  Started,
  Finished,
}

export type PollItem = {
  pollItemId: string;
  pollItemValue: string;
};
