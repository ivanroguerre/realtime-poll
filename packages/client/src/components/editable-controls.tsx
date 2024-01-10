import { ButtonGroup, IconButton, useEditableControls } from "@chakra-ui/react";
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { JSX } from "react";

import { PollItem } from "shared";
import { useItems } from "../poll-hooks";

type EditableControlsProps = {
  item: PollItem;
};
const EditableControls = ({ item }: EditableControlsProps): JSX.Element => {
  const { deleteItem } = useItems();
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
        onClick={() => deleteItem(item.id)}
      />
    </ButtonGroup>
  );
};

export default EditableControls;
