import { useGetTagsQuery } from "@/services/serverApi";
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
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  orderDirection: string;
  setorderDirection: Dispatch<SetStateAction<string>>;
  settags: Dispatch<SetStateAction<string[]>>;
}

const QuestionFilter: React.FC<Props> = ({
  orderDirection = "asc",
  setorderDirection,
  settags,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();

  const isMobile = useMediaQuery("(max-width: 500px)");

  const { data = [], isLoading, isError } = useGetTagsQuery();

  /**
   * Local state for the filter (orderDirection)
   */
  const [localOrderDirection, setlocalOrderDirection] =
    useState<string>(orderDirection);
  /**
   * Local state for the filter (tags)
   */
  const [locatags, setlocatags] = useState<string[]>([]);

  // if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  const handleApplyFilter = () => {
    setorderDirection(localOrderDirection);
    settags(locatags);
    close();
  };
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
          <Chip.Group
            multiple={false}
            value={localOrderDirection}
            onChange={setlocalOrderDirection}
          >
            <Text fw="bold">Date</Text>
            <Group>
              <Chip value="desc">Most Recent</Chip>
              <Chip value="asc">Oldest</Chip>
            </Group>
          </Chip.Group>

          <Chip.Group multiple={true} value={locatags} onChange={setlocatags}>
            <Text fw="bold">Tags</Text>
            <Group>
              {data.map((tag) => (
                <Chip key={tag.id} value={`${tag.id}`}>
                  {tag.name}
                </Chip>
              ))}
            </Group>
          </Chip.Group>

          {/* <Chip.Group
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
          </Chip.Group> */}

          <Box my="md">
            <Button radius="lg" size="xs" fullWidth onClick={handleApplyFilter}>
              Apply filter
            </Button>
          </Box>
        </Stack>
      </Modal>
    </>
  );
};

export default QuestionFilter;
