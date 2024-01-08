import { JSX, PropsWithChildren, createContext, useState } from "react";

type PollContextType = {
  pollItems: string[];
  actions: {
    addPollItem: (pollItem: string) => void;
    deletePollItem: (toDeletePollItem: string) => void;
    editPollItem: (toEditPollItem: string, editedPollItem: string) => void;
  };
};

const PollContext = createContext<PollContextType>({} as PollContextType);

const PollContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [pollItems, setPollItems] = useState<string[]>([]);
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

  return (
    <PollContext.Provider
      value={{
        pollItems,
        actions: { addPollItem, deletePollItem, editPollItem },
      }}
    >
      {children}
    </PollContext.Provider>
  );
};

export { PollContext, PollContextProvider };
