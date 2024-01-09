import { useContext } from "react";

import { PollContext } from "./poll-context";

export const usePollItems = () => {
  const {
    pollItems,
    actions: { addPollItem, deletePollItem, editPollItem },
  } = useContext(PollContext);

  return { addPollItem, deletePollItem, editPollItem, pollItems };
};

export const usePollTitle = () => {
  const {
    actions: { changePollTitle },
    pollTitle,
  } = useContext(PollContext);

  return { changePollTitle, pollTitle };
};

export const usePollStatus = () => {
  const {
    actions: { finishPoll, startPoll },
    pollStatus,
  } = useContext(PollContext);

  return { finishPoll, pollStatus, startPoll };
};
