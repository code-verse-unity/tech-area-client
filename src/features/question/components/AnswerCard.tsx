import {
  Accordion,
  ActionIcon,
  Avatar,
  Box,
  Button,
  Divider,
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
import {
  IconArrowBadgeDownFilled,
  IconArrowBadgeUpFilled,
  IconDots,
} from "@tabler/icons-react";
import { useAuth } from "@/features/auth";
import AnswerCardMenu from "./AnswerCardMenu";

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
  // const auth = useAuth();

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
        <Flex className={classes.container}>
          {/* Votes count and actions */}
          <Flex
            align="center"
            justify="center"
            direction="column"
            w="3rem"
            mr="sm"
          >
            <ActionIcon radius="xl" color="blue">
              <IconArrowBadgeUpFilled />
            </ActionIcon>
            <Text color="blue.6" fz="xl" fw="bold">
              {upCount}
            </Text>
            <Divider color="green.2" w="60%" />
            <Text color="red.6" fz="xl" fw="bold">
              {downCount}
            </Text>
            <ActionIcon radius="xl" color="red">
              <IconArrowBadgeDownFilled />
            </ActionIcon>
          </Flex>

          <Box sx={{ flex: 1 }}>
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
          </Box>

          {/* Menu */}
          <AnswerCardMenu userId={data.user.id} />
        </Flex>

        <Accordion.Panel className={classes.accordion}>
          <Stack>
            <Flex justify="end">
              {/* {auth.authenticated ? ( */}
              <Button variant="subtle" size="xs">
                Comment
              </Button>
              {/* ) : ( */}
              {/* <div>You must have an account to comment.</div> */}
              {/* )} */}
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
