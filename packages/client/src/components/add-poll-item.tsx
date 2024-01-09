import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
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
        <FormControl isInvalid={invalidPollItem} mb={4}>
          <InputGroup>
            <Input onChange={handleChange} type="text" value={pollItem} />
            <InputRightElement width="auto">
              <Button
                borderBottomLeftRadius={0}
                borderTopLeftRadius={0}
                isDisabled={invalidPollItem}
                type="submit"
              >
                Agregar
              </Button>
            </InputRightElement>
          </InputGroup>
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
      </form>
    </section>
  );
};

export default AddPollItem;
