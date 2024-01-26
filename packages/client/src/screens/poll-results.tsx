import { JSX } from "react";

import { useWinners } from "../poll-hooks";
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";

const PollResults = (): JSX.Element => {
  const winners = useWinners();

  return (
    <VStack align="stretch" justify="center" minH="100vh">
      <Box bgColor="white" borderRadius="lg" p={6}>
        <Text as="h2" mb={4}>
          Elemento(s) ganador(es)
        </Text>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Elemento de votación</Th>
                <Th isNumeric>Votos</Th>
              </Tr>
            </Thead>
            <Tbody>
              {winners.map((winner) => (
                <Tr key={winner.id}>
                  <Td>{winner.id}</Td>
                  <Td>{winner.value}</Td>
                  <Td isNumeric>
                    {winner.votes !== undefined ? winner.votes : 0}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </VStack>
  );
};

export default PollResults;
