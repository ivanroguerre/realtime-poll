import { useContext } from "react";

import { PollContext } from "./poll-context";

export const usePollItems = () => {
  const {
    pollItems,
    actions: { addPollItem },
  } = useContext(PollContext);

  return { pollItems, addPollItem };
};
