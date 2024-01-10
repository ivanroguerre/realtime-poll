import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import { FormEvent, JSX, useState } from "react";

import { useTitle } from "../poll-hooks";

const AddTitle = (): JSX.Element => {
  const { changeTitle, title } = useTitle();
  const [invalidTitle, setInvalidTitle] = useState(false);

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const _title = event.currentTarget.value;
    changeTitle(_title);
    setInvalidTitle(_title === "");
  };

  return (
    <section>
      <form onSubmit={(e) => e.preventDefault()}>
        <FormControl isInvalid={invalidTitle} mb={4}>
          <Input onChange={handleChange} type="text" value={title} />
          {!invalidTitle ? (
            <FormHelperText>Ingrese el título de la votación.</FormHelperText>
          ) : (
            <FormErrorMessage>No se permite un título vacío.</FormErrorMessage>
          )}
        </FormControl>
      </form>
    </section>
  );
};

export default AddTitle;
