import {
  Tooltip,
  ActionIcon,
  Modal,
  Stack,
  useMantineTheme,
  Chip,
  Group,
  Text,
  Button,
  Box,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconAdjustmentsHorizontal, IconFilter } from "@tabler/icons-react";
import { useState } from "react";

interface Props {
  // Props type definition here
}

const QuestionFilter: React.FC<Props> = ({}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();

  const [date, setdate] = useState("all");
  const [tags, settags] = useState([
    "laravel",
    "vue",
    "angular",
    "react",
    "node",
  ]);
  const [difficulty, setdifficulty] = useState("all");
  const isMobile = useMediaQuery("(max-width: 500px)");

  return (
    <>
      <Tooltip label="Filter">
        <ActionIcon
          color="indigo"
          radius="xl"
          variant="gradient"
          onClick={open}
        >
          <IconAdjustmentsHorizontal size="1.125rem" />
        </ActionIcon>
      </Tooltip>

      <Modal
        opened={opened}
        onClose={close}
        title="Filter the questions"
        overlayProps={{
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
        centered
        fullScreen={isMobile}
      >
        <Stack>
          <Chip.Group multiple={false} value={date} onChange={setdate}>
            <Text fw="bold">Date</Text>
            <Group>
              <Chip value="all">All</Chip>
              <Chip value="recent">Most Recent</Chip>
              <Chip value="old">Oldest</Chip>
            </Group>
          </Chip.Group>

          <Chip.Group multiple={true} value={tags} onChange={settags}>
            <Text fw="bold">Tags</Text>
            <Group>
              <Chip value="laravel">Laravel</Chip>
              <Chip value="vue">Most Recent</Chip>
              <Chip value="angular">Oldest</Chip>
              <Chip value="react">Most Recent</Chip>
              <Chip value="node">Node</Chip>
            </Group>
          </Chip.Group>

          <Chip.Group
            multiple={false}
            value={difficulty}
            onChange={setdifficulty}
          >
            <Text fw="bold">Difficulty</Text>
            <Group>
              <Chip value="all">All</Chip>
              <Chip value="easy">Easy</Chip>
              <Chip value="medium">Medium</Chip>
              <Chip value="difficult">Difficult</Chip>
            </Group>
          </Chip.Group>

          <Box my="md">
            <Button radius="lg" size="xs" fullWidth>
              Apply filter
            </Button>
          </Box>
        </Stack>
      </Modal>
    </>
  );
};

export default QuestionFilter;
