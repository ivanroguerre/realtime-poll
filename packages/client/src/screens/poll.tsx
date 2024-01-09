import { Button, VStack } from "@chakra-ui/react";

import { usePollStatus } from "../poll-hooks";

const Poll = () => {
  const { finishPoll } = usePollStatus();
  return (
    <VStack>
      <Button onClick={finishPoll}>Finalizar votación</Button>
    </VStack>
  );
};

export default Poll;
