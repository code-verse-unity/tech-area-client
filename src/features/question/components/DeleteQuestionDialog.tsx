import {
  Button,
  Group,
  Modal,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";

interface Props {
  deleteOpened: boolean;
  closeDelete: () => void;
}

const DeleteQuestionDialog: React.FC<Props> = ({
  deleteOpened,
  closeDelete,
}) => {
  const theme = useMantineTheme();

  return (
    <Modal
      opened={deleteOpened}
      onClose={closeDelete}
      withCloseButton={false}
      centered
      overlayProps={{
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
      radius="md"
    >
      <Stack spacing="sm" py="md" sx={{ textAlign: "center" }}>
        <Title order={3}> Are you sure to delete this question ?</Title>
        <Text color="gray.9">
          This action is irreverible. All answers will be deleted too.
        </Text>
        <Group grow>
          <Button size="xs" color="red">
            Sure! Delete.
          </Button>
          <Button size="xs" color="gray">
            Cancel
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default DeleteQuestionDialog;
