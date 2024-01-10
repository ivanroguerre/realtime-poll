import { Container } from "@chakra-ui/react";

import Poll from "./screens/poll";
import PollSetup from "./screens/poll-setup";
import PollResults from "./screens/poll-results";
import { Status } from "./types";
import { useStatus } from "./poll-hooks";

const App = () => {
  const { status } = useStatus();
  return (
    <Container>
      {status === Status.Setup && <PollSetup />}
      {status === Status.Start && <Poll />}
      {status === Status.Finish && <PollResults />}
    </Container>
  );
};

export default App;
