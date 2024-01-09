import { JSX, PropsWithChildren, createContext, useState } from "react";
import { customAlphabet } from "nanoid";

import { PollItem, PollStatus } from "./types";

type PollContextType = {
  actions: {
    addPollItem: (pollItemValue: PollItem["pollItemValue"]) => void;
    deletePollItem: (pollItemId: PollItem["pollItemId"]) => void;
    editPollItem: (
      pollItemId: PollItem["pollItemId"],
      newPollItemValue: PollItem["pollItemValue"]
    ) => void;
    finishPoll: VoidFunction;
    startPoll: VoidFunction;
  };
  pollItems: PollItem[];
  pollStatus: PollStatus;
};
const PollContext = createContext<PollContextType>({} as PollContextType);

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 5);

const PollContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [pollItems, setPollItems] = useState<PollItem[]>([]);
  const [pollStatus, setPollStatus] = useState<PollStatus>(PollStatus.Setup);
  const addPollItem = (pollItemValue: PollItem["pollItemValue"]) =>
    setPollItems((_pollItems) =>
      _pollItems.concat({ pollItemId: nanoid(), pollItemValue })
    );
  const deletePollItem = (pollItemId: PollItem["pollItemId"]) =>
    setPollItems((_pollItems) =>
      _pollItems.filter((_pollItem) => _pollItem.pollItemId !== pollItemId)
    );
  const editPollItem = (
    pollItemId: PollItem["pollItemId"],
    newPollItemValue: PollItem["pollItemValue"]
  ) =>
    setPollItems((_pollItems) =>
      _pollItems.map((_pollItem) =>
        _pollItem.pollItemId === pollItemId
          ? { pollItemId, pollItemValue: newPollItemValue }
          : _pollItem
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
