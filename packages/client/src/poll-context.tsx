import { JSX, PropsWithChildren, createContext, useState } from "react";
import { customAlphabet } from "nanoid";

import { PollItem } from "shared";
import { Status } from "./types";
import { useSocket } from "./socket-hooks";

type PollContextType = {
  actions: {
    addItem: (value: PollItem["value"]) => void;
    changeTitle: (title: string) => void;
    deleteItem: (id: PollItem["id"]) => void;
    editItem: (id: PollItem["id"], value: PollItem["value"]) => void;
    finish: VoidFunction;
    start: VoidFunction;
  };
  items: PollItem[];
  status: Status;
  title: string;
};
const PollContext = createContext<PollContextType>({} as PollContextType);

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 5);

const PollContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [items, setItems] = useState<PollItem[]>([]);
  const [status, setStatus] = useState<Status>(Status.Setup);
  const [title, setTitle] = useState("");
  const socket = useSocket();
  const addItem = (value: PollItem["value"]) =>
    setItems((_items) => _items.concat({ id: nanoid(), value }));
  const changeTitle = (title: string) => setTitle(title);
  const deleteItem = (id: PollItem["id"]) =>
    setItems((_items) => _items.filter((_item) => _item.id !== id));
  const editItem = (id: PollItem["id"], value: PollItem["value"]) =>
    setItems((_items) =>
      _items.map((_item) =>
        _item.id === id ? { ..._item, value: value } : _item
      )
    );
  const finish = () => setStatus(Status.Finish);
  const start = () => {
    setStatus(Status.Start);
    socket.emit("poll-started", items);
  };

  return (
    <PollContext.Provider
      value={{
        actions: {
          addItem,
          changeTitle,
          deleteItem,
          editItem,
          finish,
          start,
        },
        items,
        status,
        title,
      }}
    >
      {children}
    </PollContext.Provider>
  );
};

export { PollContext, PollContextProvider };
