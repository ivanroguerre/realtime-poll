import { ButtonGroup, IconButton, useEditableControls } from "@chakra-ui/react";
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { JSX } from "react";

import { PollItem } from "../types";
import { usePollItems } from "../poll-hooks";

type EditableControlsProps = {
  pollItem: PollItem;
};
const EditableControls = ({ pollItem }: EditableControlsProps): JSX.Element => {
  const { deletePollItem } = usePollItems();
  const {
    getCancelButtonProps,
    getEditButtonProps,
    getSubmitButtonProps,
    isEditing,
  } = useEditableControls();

  if (isEditing)
    return (
      <ButtonGroup>
        <IconButton
          aria-label="Terminar la edición del elemento de votación"
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
        />
        <IconButton
          aria-label="Cancelar la edición del elemento de votación"
          icon={<CloseIcon />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    );

  return (
    <ButtonGroup>
      <IconButton
        aria-label="Terminar la edición del elemento de votación"
        icon={<EditIcon />}
        {...getEditButtonProps()}
      />
      <IconButton
        aria-label="Borrar elemento de votación"
        icon={<DeleteIcon />}
        onClick={() => deletePollItem(pollItem.pollItemId)}
      />
    </ButtonGroup>
  );
};

export default EditableControls;
