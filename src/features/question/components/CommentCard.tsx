import { Comment } from "@/services/types";
import { Avatar, Flex, createStyles } from "@mantine/core";
import { Link } from "react-router-dom";
import dayjs from "@/utils/dayjs";

const useStyles = createStyles((theme) => ({
  container: {
    borderRadius: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
    padding: theme.spacing.md,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[1],
  },
  time: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.xs,
  },
  text: {
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === "dark" ? "white" : theme.black,
  },
  username: {
    fontSize: theme.fontSizes.sm,
    // fontWeight: "lighter",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
  },
  title: {
    color: theme.colorScheme === "dark" ? "#fff" : theme.black,
    textDecoration: "none",
  },
}));

interface Props {
  comment: Comment;
}

const CommentCard: React.FC<Props> = ({ comment }) => {
  const { classes } = useStyles();
  return (
    <div className={classes.container}>
      <Flex justify="space-between" mb={10}>
        <Flex className={classes.text} align="start" gap={10}>
          <Avatar radius="xl" src={comment.user.imageUrl} />
          <Link to="#">{comment.user.name.full}</Link>
        </Flex>
        <Flex className={classes.text} align="start" pr={4}>
          <span className={classes.time}>
            {dayjs(comment.createdAt).fromNow()}
          </span>
        </Flex>
      </Flex>
      <div
        dangerouslySetInnerHTML={{
          __html: comment.content,
        }}
      ></div>
    </div>
  );
};

export default CommentCard;
