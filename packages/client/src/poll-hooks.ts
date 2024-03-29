import { useContext } from "react";

import { PollContext } from "./poll-context";

export const useItems = () => {
  const {
    actions: { addItem, deleteItem, editItem },
    items,
  } = useContext(PollContext);

  return { addItem, deleteItem, editItem, items };
};

export const useTitle = () => {
  const {
    actions: { changeTitle },
    title,
  } = useContext(PollContext);

  return { changeTitle, title };
};

export const useStatus = () => {
  const {
    actions: { finish, load, start },
    status,
  } = useContext(PollContext);

  return { finish, load, start, status };
};

export const useWinners = () => {
  const { winners } = useContext(PollContext);

  return winners;
};
