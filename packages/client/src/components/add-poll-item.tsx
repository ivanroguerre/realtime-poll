import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  Text,
} from "@chakra-ui/react";
import { FormEvent, JSX, SyntheticEvent, useState } from "react";

type AddPollItemProps = {
  onPollItemSubmit: (pollItem: string) => void;
};
const AddPollItem = ({ onPollItemSubmit }: AddPollItemProps): JSX.Element => {
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
            <FormHelperText>Ingrese el elemento de votación.</FormHelperText>
          ) : (
            <FormErrorMessage>
              No se permite un elemento de votación vacío.
            </FormErrorMessage>
          )}
        </FormControl>
        <Button isDisabled={invalidPollItem} type="submit">
          Agregar
        </Button>
      </form>
    </section>
  );
};

export default AddPollItem;
