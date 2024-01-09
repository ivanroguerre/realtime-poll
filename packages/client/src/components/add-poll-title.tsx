import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import { FormEvent, JSX, useState } from "react";

import { usePollTitle } from "../poll-hooks";

const AddPollTitle = (): JSX.Element => {
  const { changePollTitle, pollTitle } = usePollTitle();
  const [invalidPollTitle, setInvalidPollTitle] = useState(false);

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const newPollTitle = event.currentTarget.value;
    changePollTitle(newPollTitle);
    setInvalidPollTitle(newPollTitle === "");
  };

  return (
    <section>
      <form onSubmit={(e) => e.preventDefault()}>
        <FormControl isInvalid={invalidPollTitle} mb={4}>
          <Input onChange={handleChange} type="text" value={pollTitle} />
          {!invalidPollTitle ? (
            <FormHelperText>Ingrese el título de la votación.</FormHelperText>
          ) : (
            <FormErrorMessage>No se permite un título vacío.</FormErrorMessage>
          )}
        </FormControl>
      </form>
    </section>
  );
};

export default AddPollTitle;
