import { Box, HStack, Progress, Tag, TagLabel, Text } from "@chakra-ui/react";
import { useEffect, useRef, JSX } from "react";

import { PollItem as PollItemType } from "shared";

type PollItemProps = {
  item: PollItemType;
  totalVotes: number;
};
const PollItem = ({ item, totalVotes }: PollItemProps): JSX.Element => {
  const progressRef = useRef<HTMLDivElement>(null);
  const votes = item.votes !== undefined ? item.votes : 0;
  const barProgress = totalVotes !== 0 ? (votes * 100) / totalVotes : 0;

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
        value={barProgress}
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
          {item.value}
        </Text>
        <Text>
          Vote con:{" "}
          <Tag justifyContent="center" textAlign="center" w="70px">
            <TagLabel>{item.id}</TagLabel>
          </Tag>
        </Text>
      </HStack>
    </Box>
  );
};

export default PollItem;
