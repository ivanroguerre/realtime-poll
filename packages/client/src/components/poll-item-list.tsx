import { ListItem, UnorderedList } from "@chakra-ui/react";
import { JSX } from "react";

import EditablePollItem from "./editable-poll-item";
import { usePollItems } from "../poll-hooks";

const PollItemsList = (): JSX.Element => {
  const { pollItems } = usePollItems();

  return (
    <UnorderedList ml={0} mt={4} spacing={1} styleType="none">
      {pollItems.map((pollItem) => (
        <ListItem key={pollItem.pollItemId}>
          <EditablePollItem pollItem={pollItem} />
        </ListItem>
      ))}
    </UnorderedList>
  );
};

export default PollItemsList;
