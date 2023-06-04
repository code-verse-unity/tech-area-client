import { useDeleteQuestionMutation } from "@/services/serverApi";
import {
  Button,
  Group,
  Modal,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

interface Props {
  questionId: string;
  deleteOpened: boolean;
  closeDelete: () => void;
}

const DeleteQuestionDialog: React.FC<Props> = ({
  questionId,
  deleteOpened,
  closeDelete,
}) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const [deleteQuestion, { isLoading }] = useDeleteQuestionMutation();

  const handleDelete = () => {
    deleteQuestion({ questionId })
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
          <Button
            size="xs"
            color="red"
            onClick={handleDelete}
            loading={isLoading}
          >
            Sure! Delete.
          </Button>
          <Button
            size="xs"
            color="gray"
            onClick={closeDelete}
            loading={isLoading}
          >
            Cancel
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default DeleteQuestionDialog;
