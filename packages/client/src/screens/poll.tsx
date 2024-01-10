import { Box, Button, Text, VStack } from "@chakra-ui/react";

import { useItems, useStatus, useTitle } from "../poll-hooks";
import PollItem from "../components/poll-item";

const Poll = () => {
  const { items } = useItems();
  const { title } = useTitle();
  const { finish } = useStatus();
  return (
    <VStack align="stretch" justify="center" minH="100vh">
      <Box bgColor="white" borderRadius="lg" p={6}>
        <Text as="h2" mb={4}>
          {title}
        </Text>
        <VStack align="stretch" gap={3} mb={4}>
          {items.map((item) => (
            <PollItem item={item} />
          ))}
        </VStack>
        <Button onClick={finish}>Finalizar votación</Button>
      </Box>
    </VStack>
  );
};

export default Poll;
