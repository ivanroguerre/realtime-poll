import { JSX, PropsWithChildren, createContext, useState } from "react";

import { PollStatus } from "./types";

type PollContextType = {
  actions: {
    addPollItem: (pollItem: string) => void;
    deletePollItem: (toDeletePollItem: string) => void;
    editPollItem: (toEditPollItem: string, editedPollItem: string) => void;
    finishPoll: VoidFunction;
    startPoll: VoidFunction;
  };
  pollItems: string[];
  pollStatus: PollStatus;
};

const PollContext = createContext<PollContextType>({} as PollContextType);

const PollContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [pollItems, setPollItems] = useState<string[]>([]);
  const [pollStatus, setPollStatus] = useState<PollStatus>(PollStatus.Setup);
  const addPollItem = (pollItem: string) =>
    setPollItems((pollItems) => pollItems.concat(pollItem));
  const deletePollItem = (toDeletePollItem: string) =>
    setPollItems((pollItems) =>
      pollItems.filter((pollItem) => pollItem !== toDeletePollItem)
    );
  const editPollItem = (toEditPollItem: string, editedPollItem: string) =>
    setPollItems((pollItems) =>
      pollItems.map((pollItem) =>
        pollItem === toEditPollItem ? editedPollItem : pollItem
      )
    );
  const finishPoll = () => setPollStatus(PollStatus.Finished);
  const startPoll = () => setPollStatus(PollStatus.Started);

  return (
    <PollContext.Provider
      value={{
        actions: {
          addPollItem,
          deletePollItem,
          editPollItem,
          finishPoll,
          startPoll,
        },
        pollItems,
        pollStatus,
      }}
    >
      {children}
    </PollContext.Provider>
  );
};

export { PollContext, PollContextProvider };
