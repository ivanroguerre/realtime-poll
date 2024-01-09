import {
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
} from "@chakra-ui/react";
import { JSX } from "react";

import EditableControls from "./editable-controls";
import { PollItem } from "../types";
import { usePollItems } from "../poll-hooks";

type EditablePollItemProps = {
  pollItem: PollItem;
};
const EditablePollItem = ({ pollItem }: EditablePollItemProps): JSX.Element => {
  const { editPollItem } = usePollItems();

  const handleSubmit = (editedPollItem: string) =>
    editPollItem(pollItem.pollItemId, editedPollItem);

  return (
    <Editable
      defaultValue={pollItem.pollItemValue}
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
