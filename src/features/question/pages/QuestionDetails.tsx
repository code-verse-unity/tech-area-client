import {
  Accordion,
  Avatar,
  Badge,
  Button,
  Drawer,
  Flex,
  Group,
  Stack,
  Text,
  Title,
  createStyles,
} from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import AnswerCard from "../components/AnswerCard";
import { useDisclosure } from "@mantine/hooks";
import { useGetOneQuestionQuery } from "@/services/serverApi";
import dayjs from "@/utils/dayjs";
import { useAuth } from "@/features/auth";
import { useAppSelector } from "@/hooks/redux";
import { selectAuth } from "@/redux/selectors/authSelector";
import Error from "@/features/error/Error";

const useStyles = createStyles((theme) => ({
  container: {
    borderRadius: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
    boxShadow: theme.shadows.lg,
    padding: theme.spacing.md,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[1],
  },
  time: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,
  },
  text: {
    fontSize: theme.fontSizes.md,
    color: theme.colorScheme === "dark" ? "white" : theme.black,
  },
  username: {
    fontSize: theme.fontSizes.md,
    // fontWeight: "lighter",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
  },
  title: {
    color: theme.colorScheme === "dark" ? "#fff" : theme.black,
    textDecoration: "none",
  },
}));

const QuestionDetails = () => {
  const { classes } = useStyles();
  const [opened, { close, open }] = useDisclosure();
  const isAuthenticated = useAppSelector(selectAuth);

  /**
   * Get the information of the question specified in params
   */
  const { questionId = "" } = useParams<{ questionId: string }>();
  const { data, isLoading, isError, isSuccess } = useGetOneQuestionQuery({
    questionId,
  });

  if (isError) {
    return <Error />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isSuccess) {
    return (
      <Stack my="lg" className={classes.text}>
        {/* Question overview */}
        <div className={classes.container}>
          <h2 className={classes.title}>{data.title}</h2>
          <p
            className={classes.text}
            dangerouslySetInnerHTML={{
              __html: data.content,
            }}
          ></p>
          <Flex justify="space-between">
            <Flex className={classes.text} align="center" gap={4}>
              <Avatar radius="xl" src={data.user.imageUrl} />
              <Link to="#">{data.user.name.full}</Link>
            </Flex>
            <Flex className={classes.text} align="center">
              <span className={classes.time}>
                {dayjs(data.createdAt).fromNow()}
              </span>
            </Flex>
          </Flex>

          <Flex gap="sm" mt={10}>
            {data.tags.map((tag) => (
              <Badge
                key={tag.id}
                // component={Link}
                // to="/tag"
                color={tag.bgColor}
                variant="filled"
                sx={{ cursor: "pointer" }}
              >
                {tag.name}
              </Badge>
            ))}
          </Flex>
        </div>

        {/* Answer list */}
        <Stack>
          <Flex justify="space-between">
            <Flex align="center" gap={4}>
              <Text color="green.6" fz="md" fw="bold">
                {data.answers.length}
              </Text>
              Answers
            </Flex>

            {/* Create an answer only if the user is authenticated */}
            {isAuthenticated ? (
              <Button variant="subtle" size="xs" onClick={open}>
                Give your answer
              </Button>
            ) : (
              <div>You must have an account to give an answer.</div>
            )}
          </Flex>

          <Accordion variant="filled" radius="lg">
            {data.answers.map((answer) => (
              <AnswerCard answerId={answer.id} />
            ))}
          </Accordion>
        </Stack>

        {/* Drawer for adding answer */}
        <Drawer
          title="Suggest an solution"
          position="bottom"
          onClose={close}
          opened={opened}
          overlayProps={{ opacity: 0.5, blur: 4 }}
          size="md"
        >
          hello
        </Drawer>
      </Stack>
    );
  } else {
    return null;
  }
};

export default QuestionDetails;
