import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react";
import { FormEvent, JSX, SyntheticEvent, useState } from "react";

import { usePollItems, usePollStatus } from "../poll-hooks";

type AddPollItemProps = {
  onPollItemSubmit: (pollItem: string) => void;
};
const AddPollItem = ({ onPollItemSubmit }: AddPollItemProps): JSX.Element => {
  const { pollItems } = usePollItems();
  const { startPoll } = usePollStatus();
  const [pollItem, setPollItem] = useState("");
  const [invalidPollItem, setInvalidPollItem] = useState(false);

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const newPollItem = event.currentTarget.value;
    setPollItem(newPollItem);
    setInvalidPollItem(newPollItem === "");
  };
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (pollItem === "") {
      setInvalidPollItem(true);
      return;
    }
    onPollItemSubmit(pollItem);
    setPollItem("");
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <Text as="h2" mb={4}>
          Configuración de votación
        </Text>
        <FormControl isInvalid={invalidPollItem} mb={4}>
          <Input onChange={handleChange} type="text" value={pollItem} />
          {!invalidPollItem ? (
            <FormHelperText>
              Ingrese mínimo dos elementos para iniciar la votación.
            </FormHelperText>
          ) : (
            <FormErrorMessage>
              No se permite un elemento de votación vacío.
            </FormErrorMessage>
          )}
        </FormControl>
        <HStack justify="space-between">
          <Button isDisabled={invalidPollItem} type="submit">
            Agregar
          </Button>
          <Button
            isDisabled={pollItems.length < 2}
            onClick={startPoll}
            type="button"
          >
            Iniciar votación
          </Button>
        </HStack>
      </form>
    </section>
  );
};

export default AddPollItem;
