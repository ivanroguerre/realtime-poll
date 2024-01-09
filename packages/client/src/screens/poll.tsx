import { Box, Button, Text, VStack } from "@chakra-ui/react";

import { usePollItems, usePollStatus, usePollTitle } from "../poll-hooks";
import PollItem from "../components/poll-item";

const Poll = () => {
  const { pollItems } = usePollItems();
  const { pollTitle } = usePollTitle();
  const { finishPoll } = usePollStatus();
  return (
    <VStack align="stretch" justify="center" minH="100vh">
      <Box bgColor="white" borderRadius="lg" p={6}>
        <Text as="h2" mb={4}>
          {pollTitle}
        </Text>
        <VStack align="stretch" gap={3} mb={4}>
          {pollItems.map((pollItem) => (
            <PollItem pollItem={pollItem} />
          ))}
        </VStack>
        <Button onClick={finishPoll}>Finalizar votación</Button>
      </Box>
    </VStack>
    // <VStack align="flex-start">
    //   <Text as="h2">{pollTitle}</Text>
    // </VStack>
  );
};

export default Poll;
