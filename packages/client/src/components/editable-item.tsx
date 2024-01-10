import {
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
} from "@chakra-ui/react";
import { JSX } from "react";

import EditableControls from "./editable-controls";
import { PollItem } from "shared";
import { useItems } from "../poll-hooks";

type EditablePollItemProps = {
  item: PollItem;
};
const EditableItem = ({ item }: EditablePollItemProps): JSX.Element => {
  const { editItem } = useItems();

  const handleSubmit = (value: string) => editItem(item.id, value);

  return (
    <Editable
      defaultValue={item.value}
      isPreviewFocusable={false}
      onSubmit={handleSubmit}
    >
      <HStack justify="space-between">
        <EditablePreview />
        <EditableInput />
        <EditableControls item={item} />
      </HStack>
    </Editable>
  );
};

export default EditableItem;
