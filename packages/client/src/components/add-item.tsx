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

type AddItemProps = {
  onItemSubmit: (value: string) => void;
};
const AddItem = ({ onItemSubmit }: AddItemProps): JSX.Element => {
  const [item, setItem] = useState("");
  const [invalidItem, setInvalidItem] = useState(false);

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const _item = event.currentTarget.value;
    setItem(_item);
    setInvalidItem(_item === "");
  };
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (item === "") {
      setInvalidItem(true);
      return;
    }
    onItemSubmit(item);
    setItem("");
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <FormControl isInvalid={invalidItem} mb={4}>
          <InputGroup>
            <Input onChange={handleChange} type="text" value={item} />
            <InputRightElement width="auto">
              <Button
                borderBottomLeftRadius={0}
                borderTopLeftRadius={0}
                isDisabled={invalidItem}
                type="submit"
              >
                Agregar
              </Button>
            </InputRightElement>
          </InputGroup>
          {!invalidItem ? (
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

export default AddItem;
