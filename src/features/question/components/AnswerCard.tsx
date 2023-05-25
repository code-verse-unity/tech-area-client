import {
  Accordion,
  Avatar,
  Button,
  Flex,
  Stack,
  Text,
  createStyles,
} from "@mantine/core";
import { useColorScheme, useToggle } from "@mantine/hooks";
import { Link } from "react-router-dom";
import CommentCard from "./CommentCard";
import { useGetOneAnswerQuery } from "@/services/serverApi";
import dayjs from "@/utils/dayjs";

const useStyles = createStyles((theme) => ({
  container: {
    borderRadius: theme.spacing.sm,
    padding: theme.spacing.md,
    // boxShadow: theme.shadows.lg,
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
  accordion: {
    backgroundColor: theme.colorScheme === "dark" ? "#444559" : undefined,
  },
}));

interface Props {
  answerId: number;
}

const AnswerCard: React.FC<Props> = ({ answerId }) => {
  const { classes } = useStyles();
  const [approved, toggle] = useToggle([false, true]);
  const theme = useColorScheme();

  const { data, isLoading, isError, isSuccess } = useGetOneAnswerQuery({
    answerId: `${answerId}`,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  if (isSuccess) {
    const upCount = (data?.votes.filter((vote) => vote.type === "up")).length;
    const downCount = (data?.votes.filter(
      (vote) => vote.type === "down"
    )).length;

    return (
      <Accordion.Item
        value={`${answerId}`}
        mb="md"
        className={classes.accordion}
      >
        <div className={classes.container}>
          {/* Heading */}
          <Flex justify="space-between">
            <Flex align="center" gap={4}>
              <Text color="green.6" fz="md" fw="bold">
                {upCount}
              </Text>
              <b>Up</b>
              <Text color="green.6" fz="md" fw="bold">
                {downCount}
              </Text>
              <b>Down</b>
            </Flex>
            <Flex align="center">
              <Button
                color="indigo"
                radius="xl"
                variant="filled"
                onClick={() => toggle()}
                size="xs"
              >
                {approved ? "Approved" : "Approve"}
              </Button>
            </Flex>
          </Flex>

          {/* Content */}
          <p
            dangerouslySetInnerHTML={{
              __html: data.content,
            }}
          ></p>

          {/* User */}
          <Flex justify="space-between">
            <Flex className={classes.text} align="center" gap={4}>
              By
              <Link to="#">{data.user.name.full}</Link>
            </Flex>
            <Flex className={classes.text} align="center" pr={4}>
              <span className={classes.time}>
                {dayjs(data.createdAt).fromNow()}
              </span>
            </Flex>
          </Flex>

          {/* Comments */}
          <Flex justify="space-between" mt={4}>
            <Flex align="center" gap={4}>
              <Text fz="sm" fw="bold">
                {data.comments.length} Comments
              </Text>
            </Flex>
            <Flex className={classes.text} align="center">
              <Accordion.Control bg="#fff0">
                <Text fz="sm">Show comments</Text>
              </Accordion.Control>
            </Flex>
          </Flex>
        </div>

        <Accordion.Panel className={classes.accordion}>
          <Stack>
            <Flex justify="end">
              <Button variant="subtle" size="xs">
                Comment
              </Button>
            </Flex>

            {data.comments.map((comment) => (
              <CommentCard comment={comment} />
            ))}
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    );
  } else {
    return null;
  }
};

export default AnswerCard;
