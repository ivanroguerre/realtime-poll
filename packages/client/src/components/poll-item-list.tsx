import { ListItem, UnorderedList } from "@chakra-ui/react";
import { JSX } from "react";

import EditableItem from "./editable-item";
import { useItems } from "../poll-hooks";

const PollItemsList = (): JSX.Element => {
  const { items } = useItems();

  return (
    <UnorderedList ml={0} mt={4} spacing={1} styleType="none">
      {items.map((item) => (
        <ListItem key={item.id}>
          <EditableItem item={item} />
        </ListItem>
      ))}
    </UnorderedList>
  );
};

export default PollItemsList;
