import { Container } from "@chakra-ui/react";

import Poll from "./screens/poll";
import PollSetup from "./screens/poll-setup";
import PollResults from "./screens/poll-results";
import { PollStatus } from "./types";
import { usePollStatus } from "./poll-hooks";

const App = () => {
  const { pollStatus } = usePollStatus();
  return (
    <Container>
      {pollStatus === PollStatus.Setup && <PollSetup />}
      {pollStatus === PollStatus.Started && <Poll />}
      {pollStatus === PollStatus.Finished && <PollResults />}
    </Container>
  );
};

export default App;
