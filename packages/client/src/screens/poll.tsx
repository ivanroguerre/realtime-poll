import { Box, Button, Text, VStack } from "@chakra-ui/react";

import { useItems, useStatus, useTitle } from "../poll-hooks";
import PollItem from "../components/poll-item";
import { PollItem as PollItemType } from "shared";

const Poll = () => {
  const { items } = useItems();
  const { title } = useTitle();
  const { finish } = useStatus();
  const totalVotes = items.reduce(
    (accumulatedVotes: number, item: PollItemType) => {
      if (item.votes !== undefined) return accumulatedVotes + item.votes;
      return accumulatedVotes;
    },
    0
  );
  return (
    <VStack align="stretch" justify="center" minH="100vh">
      <Box bgColor="white" borderRadius="lg" p={6}>
        <Text as="h2" mb={4}>
          {title}
        </Text>
        <VStack align="stretch" gap={3} mb={4}>
          {items.map((item) => (
            <PollItem item={item} key={item.id} totalVotes={totalVotes} />
          ))}
        </VStack>
        <Button onClick={finish}>Finalizar votación</Button>
      </Box>
    </VStack>
  );
};

export default Poll;
