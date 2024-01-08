import {
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
} from "@chakra-ui/react";
import { JSX } from "react";

import EditableControls from "./editable-controls";
import { usePollItems } from "../poll-hooks";

type EditablePollItemProps = {
  pollItem: string;
};
const EditablePollItem = ({ pollItem }: EditablePollItemProps): JSX.Element => {
  const { editPollItem } = usePollItems();

  const handleSubmit = (editedPollItem: string) =>
    editPollItem(pollItem, editedPollItem);

  return (
    <Editable
      defaultValue={pollItem}
      isPreviewFocusable={false}
      onSubmit={handleSubmit}
    >
      <HStack justify="space-between">
        <EditablePreview />
        <EditableInput />
        <EditableControls pollItem={pollItem} />
      </HStack>
    </Editable>
  );
};

export default EditablePollItem;
