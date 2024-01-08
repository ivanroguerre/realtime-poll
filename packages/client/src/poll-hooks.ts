import { useContext } from "react";

import { PollContext } from "./poll-context";

export const usePollItems = () => {
  const {
    pollItems,
    actions: { addPollItem, deletePollItem, editPollItem },
  } = useContext(PollContext);

  return { addPollItem, deletePollItem, editPollItem, pollItems };
};
