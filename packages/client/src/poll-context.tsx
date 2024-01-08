import { JSX, PropsWithChildren, createContext, useState } from "react";

type PollContextType = {
  pollItems: string[];
  actions: {
    addPollItem: (pollItem: string) => void;
    deletePollItem: (pollItem: string) => void;
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

  return (
    <PollContext.Provider
      value={{ pollItems, actions: { addPollItem, deletePollItem } }}
    >
      {children}
    </PollContext.Provider>
  );
};

export { PollContext, PollContextProvider };
