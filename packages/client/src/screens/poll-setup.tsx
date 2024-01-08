import { Box, ListItem, Text, UnorderedList, VStack } from "@chakra-ui/react";

import AddPollItem from "../components/add-poll-item";
import { usePollItems } from "../poll-hooks";

const PollSetup = () => {
  const { pollItems, addPollItem: handlePollItemSubmit } = usePollItems();
  return (
    <VStack align="stretch" justify="center" minH="100vh">
      <Box bgColor="white" borderRadius="lg" p={6}>
        <AddPollItem onPollItemSubmit={handlePollItemSubmit} />
        <UnorderedList>
          {pollItems.map((pollItem) => (
            <ListItem key={pollItem}>{pollItem}</ListItem>
          ))}
        </UnorderedList>
      </Box>
    </VStack>
  );
};

export default PollSetup;
