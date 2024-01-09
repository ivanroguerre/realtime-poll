import { Box, Button, Text, VStack } from "@chakra-ui/react";

import AddPollItem from "../components/add-poll-item";
import AddPollTitle from "../components/add-poll-title";
import PollItemsList from "../components/poll-item-list";
import { usePollItems, usePollStatus, usePollTitle } from "../poll-hooks";

const PollSetup = () => {
  const { addPollItem: handlePollItemSubmit, pollItems } = usePollItems();
  const { pollTitle } = usePollTitle();
  const { startPoll } = usePollStatus();
  return (
    <VStack align="stretch" justify="center" minH="100vh">
      <Box bgColor="white" borderRadius="lg" p={6}>
        <Text as="h2" mb={4}>
          Configuración de votación
        </Text>
        <AddPollTitle />
        <AddPollItem onPollItemSubmit={handlePollItemSubmit} />
        <Button
          isDisabled={pollItems.length < 2 || pollTitle.length === 0}
          onClick={startPoll}
          type="button"
        >
          Iniciar votación
        </Button>
        <PollItemsList />
      </Box>
    </VStack>
  );
};

export default PollSetup;
