import { JSX, PropsWithChildren, createContext, useState } from "react";

type PollContextType = {
  pollItems: string[];
  actions: {
    addPollItem: (pollItem: string) => void;
  };
};

const PollContext = createContext<PollContextType>({} as PollContextType);

const PollContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [pollItems, setPollItems] = useState<string[]>([]);
  const addPollItem = (pollItem: string) =>
    setPollItems((pollItems) => pollItems.concat(pollItem));

  return (
    <PollContext.Provider value={{ pollItems, actions: { addPollItem } }}>
      {children}
    </PollContext.Provider>
  );
};

export { PollContext, PollContextProvider };
