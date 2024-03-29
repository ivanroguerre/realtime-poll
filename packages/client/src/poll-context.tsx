import {
  JSX,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
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
    load: VoidFunction;
    start: VoidFunction;
  };
  items: PollItem[];
  status: Status;
  title: string;
  winners: PollItem[];
};
const PollContext = createContext<PollContextType>({} as PollContextType);

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 5);

const PollContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [items, setItems] = useState<PollItem[]>([]);
  const [winners, setWinners] = useState<PollItem[]>([]);
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
  const finish = () => {
    setStatus(Status.Load);
    setStatus(Status.Finish);
    socket.emit("poll-finish", (res: { status: string }) => {
      if (res.status === "ok") {
        fetch("http://127.0.0.1:3000/poll/winners")
          .then((rawRes) => rawRes.json())
          .then((_winners: PollItem[]) => setWinners(_winners));
        setStatus(Status.Finish);
      }
    });
  };
  const load = () => setStatus(Status.Load);
  const start = () => {
    setStatus(Status.Load);
    socket.emit("poll-setup", { items, title }, (res: { status: string }) => {
      if (res.status === "ok") setStatus(Status.Start);
    });
  };

  useEffect(() => {
    socket.on("poll-update", ({ id, votes }) =>
      setItems((_items) =>
        _items.map((_item) => (_item.id === id ? { ..._item, votes } : _item))
      )
    );
  }, []);

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
          load,
        },
        items,
        status,
        title,
        winners,
      }}
    >
      {children}
    </PollContext.Provider>
  );
};

export { PollContext, PollContextProvider };
