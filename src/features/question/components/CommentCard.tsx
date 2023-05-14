import { Avatar, Flex, createStyles } from "@mantine/core";
import { Link } from "react-router-dom";

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
  // Props type definition here
}

const CommentCard: React.FC<Props> = ({}) => {
  const { classes } = useStyles();
  return (
    <div className={classes.container}>
      <Flex justify="space-between" mb={10}>
        <Flex className={classes.text} align="start" gap={10}>
          <Avatar radius="xl" />
          <Link to="#">John Doe</Link>
        </Flex>
        <Flex className={classes.text} align="start" pr={4}>
          <span className={classes.time}>10 days ago</span>
        </Flex>
      </Flex>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis illo
        vel dolorum eligendi cum. Ad, blanditiis! Qui veniam similique excepturi
        quasi autem culpa earum dolorum ex sed incidunt, asperiores aliquid?
      </div>
    </div>
  );
};

export default CommentCard;
