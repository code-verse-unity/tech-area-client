import {
  Tooltip,
  ActionIcon,
  Modal,
  Stack,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFilter } from "@tabler/icons-react";

interface Props {
  // Props type definition here
}

const QuestionFilter: React.FC<Props> = ({}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();

  return (
    <>
      <Tooltip label="Ask a new question">
        <ActionIcon color="gray" radius="xl" variant="filled" onClick={open}>
          <IconFilter size="1.125rem" />
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
      >
        <Stack h={300}>Filter modal</Stack>
      </Modal>
    </>
  );
};

export default QuestionFilter;
