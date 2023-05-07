import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Group,
  Modal,
  Stack,
  Text,
  Title,
  Tooltip,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCalendar,
  IconDeviceGamepad,
  IconGoGame,
  IconQuestionMark,
} from "@tabler/icons-react";
import { IconAdCircleFilled, IconPlus } from "@tabler/icons-react";
import NewQuestionModal from "./NewQuestionModal";

const useStyles = createStyles((theme) => ({
  container: {
    borderRadius: theme.spacing.xs,
    boxShadow: theme.shadows.md,
    padding: 10,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[4] : "white",
  },
  wrapper: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
  },

  text: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
}));

interface Props {
  // Props type definition here
}

const ActionCard: React.FC<Props> = ({}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const { classes } = useStyles();
  return (
    <>
      <Group className={classes.container}>
        <Tooltip label="Ask a new question">
          <ActionIcon color="green" radius="xl" variant="filled" onClick={open}>
            <IconPlus size="1.125rem" />
          </ActionIcon>
        </Tooltip>

        <Tooltip label="Create a challenge">
          <ActionIcon color="orange.6" radius="xl" variant="filled">
            <IconDeviceGamepad size="1.125rem" />
          </ActionIcon>
        </Tooltip>

        <Tooltip label="Publish an event">
          <ActionIcon color="blue.7" radius="xl" variant="filled">
            <IconCalendar size="1.125rem" />
          </ActionIcon>
        </Tooltip>
      </Group>

      <NewQuestionModal opened={opened} onClose={close} />
    </>
  );
};

export default ActionCard;
