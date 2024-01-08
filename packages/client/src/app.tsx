import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import AddPollItem from "./components/add-poll-item";
import { Text } from "@chakra-ui/react";

// const socket = io("http://localhost:3000");
// socket.on("events", function (data) {
//   console.log("event", data);
// });

const App = () => {
  const [pollItems, setPollItems] = useState<string[]>([]);

  const handlePollItemSubmit = (pollItem: string) =>
    setPollItems((pollItems) => pollItems.concat(pollItem));

  useEffect(() => {
    // socket.emit("events", "blablabla", (data: any) => console.log(data));
  }, []);
  return (
    <>
      <AddPollItem onPollItemSubmit={handlePollItemSubmit} />
      {pollItems.map((pollItem) => (
        <Text key={pollItem}>{pollItem}</Text>
      ))}
    </>
  );
};

export default App;
