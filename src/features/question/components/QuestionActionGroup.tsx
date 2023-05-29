import { useAppSelector } from "@/hooks/redux";
import { selectAuth } from "@/redux/selectors/authSelector";
import { Group, Button } from "@mantine/core";

interface Props {
  openReply: () => void;
  openEdit: () => void;
  openDelete: () => void;
}

const QuestionActionGroup: React.FC<Props> = ({
  openReply,
  openEdit,
  openDelete,
}) => {
  const isAuthenticated = useAppSelector(selectAuth);

  if (!isAuthenticated) {
    return <div>You must have an account to give an answer.</div>;
  }

  return (
    <Group>
      <Button variant="outline" size="xs" color="cyan" onClick={openEdit}>
        Edit
      </Button>
      <Button variant="outline" size="xs" color="red" onClick={openDelete}>
        Remove
      </Button>
      <Button variant="outline" size="xs" onClick={openReply}>
        Reply
      </Button>
    </Group>
  );
};

export default QuestionActionGroup;
