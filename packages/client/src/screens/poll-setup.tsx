import { Box, VStack } from "@chakra-ui/react";

import AddPollItem from "../components/add-poll-item";
import PollItemsList from "../components/poll-item-list";
import { usePollItems } from "../poll-hooks";

const PollSetup = () => {
  const { addPollItem: handlePollItemSubmit } = usePollItems();
  return (
    <VStack align="stretch" justify="center" minH="100vh">
      <Box bgColor="white" borderRadius="lg" p={6}>
        <AddPollItem onPollItemSubmit={handlePollItemSubmit} />
        <PollItemsList />
      </Box>
    </VStack>
  );
};

export default PollSetup;
