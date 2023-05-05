import {
  Box,
  Button,
  Divider,
  Group,
  Modal,
  Stack,
  Text,
  Title,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconAdCircleFilled, IconPlus } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  container: {
    borderRadius: theme.spacing.xs,
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
      <Stack className={classes.container}>
        <Group>
          <Group position="apart" px="md">
            <Text className={classes.text} fw={500}>
              Actions
            </Text>
          </Group>

          <Divider
            my="sm"
            mx="-md"
            color={theme.colorScheme === "dark" ? "red" : "gray.1"}
          />
          <Stack spacing={3}>
            <Text>Do you have something in mind ?</Text>
            <Button size="sm" leftIcon={<IconPlus />} onClick={open}>
              Ask question
            </Button>
          </Stack>

          <Stack spacing={3}>
            <Text>Do you have something in mind ?</Text>
            <Button size="sm" leftIcon={<IconPlus />} onClick={open}>
              Ask question
            </Button>
          </Stack>
        </Group>
      </Stack>
      <Modal
        opened={opened}
        onClose={close}
        title="Ask your question"
        overlayProps={{
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
      >
        New question
      </Modal>
    </>
  );
};

export default ActionCard;
