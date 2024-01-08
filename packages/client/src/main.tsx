import "./main.css";

import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";

import App from "./app";
import { PollContextProvider } from "./poll-context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider>
      <PollContextProvider>
        <App />
      </PollContextProvider>
    </ChakraProvider>
  </StrictMode>
);
