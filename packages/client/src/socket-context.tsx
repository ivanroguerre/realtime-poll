import { createContext, JSX, PropsWithChildren } from "react";
import { io, Socket } from "socket.io-client";

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
  socket.on("poll-update", (d) => {
    console.log(d);
  });
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
