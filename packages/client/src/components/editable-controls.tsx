import { DeleteIcon } from "@chakra-ui/icons";
import { IconButton, useEditableControls } from "@chakra-ui/react";
import { JSX } from "react";

type EditableControlsProps = {
  onDeletePollItem: (pollItem: string) => void;
  pollItem: string;
};
const EditableControls = ({
  onDeletePollItem,
  pollItem,
}: EditableControlsProps): JSX.Element => {
  const { isEditing } = useEditableControls();

  if (isEditing) return <>bla</>;

  return (
    <IconButton
      aria-label="Borrar elemento de votación"
      icon={<DeleteIcon />}
      onClick={() => onDeletePollItem(pollItem)}
    />
  );
};

export default EditableControls;
