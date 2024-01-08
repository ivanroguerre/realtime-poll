import {
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { JSX } from "react";

import EditableControls from "./editable-controls";
import { usePollItems } from "../poll-hooks";

const PollItemsList = (): JSX.Element => {
  const { pollItems, deletePollItem: handleDeletePollItem } = usePollItems();
  return (
    <UnorderedList ml={0} mt={4} spacing={1} styleType="none">
      {pollItems.map((pollItem) => (
        <ListItem key={pollItem}>
          <Editable defaultValue={pollItem}>
            <HStack justify="space-between">
              <EditablePreview />
              <EditableInput />
              <EditableControls
                onDeletePollItem={handleDeletePollItem}
                pollItem={pollItem}
              />
            </HStack>
          </Editable>
        </ListItem>
      ))}
    </UnorderedList>
  );
};

export default PollItemsList;
