import { useAppSelector } from "@/hooks/redux";
import { selectAuth } from "@/redux/selectors/authSelector";
import { selectUserId } from "@/redux/selectors/userSelector";
import { Group, Button } from "@mantine/core";

interface Props {
  userId: number;
  openReply: () => void;
  openEdit: () => void;
  openDelete: () => void;
}

const QuestionActionGroup: React.FC<Props> = ({
  userId,
  openReply,
  openEdit,
  openDelete,
}) => {
  const isAuthenticated = useAppSelector(selectAuth);
  const authUserId = useAppSelector(selectUserId);

  if (!isAuthenticated) {
    return <div>You must have an account to give an answer.</div>;
  }

  return (
    <Group>
      {/* We need to verify if the user that asks the question
       * is the same that the currently connected.
       * If that's not the case, we don't give him the ability
       * to update or delete the question
       */}
      {userId === authUserId && (
        <>
          <Button variant="outline" size="xs" color="cyan" onClick={openEdit}>
            Edit
          </Button>
          <Button variant="outline" size="xs" color="red" onClick={openDelete}>
            Remove
          </Button>
        </>
      )}
      <Button variant="outline" size="xs" onClick={openReply}>
        Reply
      </Button>
    </Group>
  );
};

export default QuestionActionGroup;
