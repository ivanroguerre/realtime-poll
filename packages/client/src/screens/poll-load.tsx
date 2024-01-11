import { Spinner, VStack } from "@chakra-ui/react";

const PollLoad = () => {
  return (
    <VStack align="stretch" justify="center" minH="100vh">
      <Spinner alignSelf="center" size="xl" />
    </VStack>
  );
};

export default PollLoad;
