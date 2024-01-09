import { Box, HStack, Progress, Tag, TagLabel, Text } from "@chakra-ui/react";
import { useEffect, useRef, JSX } from "react";

import { PollItem as PollItemType } from "../types";

type PollItemProps = {
  pollItem: PollItemType;
};
const PollItem = ({ pollItem }: PollItemProps): JSX.Element => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progress: HTMLDivElement = progressRef.current!.querySelector(
      '[role="progressbar"]'
    )!;
    progress!.style.backgroundColor = "#00000017";
    progress!.style.borderRight = "1px solid #c8c8c8";
    progress!.style.position = "relative";
    progress!.style.zIndex = "3";
  }, []);

  return (
    <Box pos="relative">
      <Progress
        bgColor="white"
        borderWidth="1px"
        borderColor="#c8c8c8"
        borderRadius={4}
        boxShadow="inset -1px 2px 2px 0px rgba(0, 0, 0, 0.3)"
        height="32px"
        ref={progressRef}
        value={
          pollItem.pollItemVotesValue !== undefined
            ? pollItem.pollItemVotesValue
            : 0
        }
      />
      <HStack
        h="32px"
        justify="space-between"
        pos="absolute"
        px={4}
        top={0}
        w="100%"
      >
        <Text textOverflow="ellipsis" overflow="hidden">
          {pollItem.pollItemValue}
        </Text>
        <Text>
          Vote con:{" "}
          <Tag justifyContent="center" textAlign="center" w="70px">
            <TagLabel>{pollItem.pollItemId}</TagLabel>
          </Tag>
        </Text>
      </HStack>
    </Box>
  );
};

export default PollItem;