import { createContext, JSX, PropsWithChildren } from "react";
import { io, Socket } from "socket.io-client";

// import { useItems } from "./poll-hooks";

const socket = io("http://127.0.0.1:3000");

type SocketContextType = {
  socket: Socket;
};
export const SocketContext = createContext<SocketContextType>(
  {} as SocketContextType
);

export const SocketContextProvider = ({
  children,
}: PropsWithChildren): JSX.Element => {
  // const { voteItem } = useItems();
  // socket.on("poll-update", ({ id, votes }) => voteItem(id, votes));
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
