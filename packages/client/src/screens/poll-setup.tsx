import { Box, Button, Text, VStack } from "@chakra-ui/react";

import AddItem from "../components/add-item";
import AddTitle from "../components/add-title";
import PollItemsList from "../components/poll-item-list";
import { useItems, useStatus, useTitle } from "../poll-hooks";

const PollSetup = () => {
  const { addItem: handleItemSubmit, items } = useItems();
  const { title } = useTitle();
  const { start } = useStatus();
  return (
    <VStack align="stretch" justify="center" minH="100vh">
      <Box bgColor="white" borderRadius="lg" p={6}>
        <Text as="h2" mb={4}>
          Configuración de votación
        </Text>
        <AddTitle />
        <AddItem onItemSubmit={handleItemSubmit} />
        <Button
          isDisabled={items.length < 2 || title.length === 0}
          onClick={start}
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
