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
import parse, {
  Element,
  HTMLReactParserOptions,
  domToReact,
} from "html-react-parser";
import { Prism } from "@mantine/prism";
import DOMPurify from "dompurify";
import { IconMessageCircle } from "@tabler/icons-react";
import QuestionActionGroup from "../components/QuestionActionGroup";
import QuestionFormModal from "@/components/QuestionFormModal";
import DeleteQuestionDialog from "../components/DeleteQuestionDialog";
import AnswerFormDrawer from "../components/AnswerFormDrawer";

const useStyles = createStyles((theme) => ({
  container: {
    borderRadius: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
    boxShadow: theme.shadows.lg,
    padding: theme.spacing.lg,
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
    color: theme.colorScheme === "dark" ? "#fff" : theme.black,
  },
  title: {
    color: theme.colorScheme === "dark" ? "#fff" : theme.black,
    textDecoration: "none",
    // fontFamily: "Poppins",
  },
}));

const QuestionDetails = () => {
  const { classes } = useStyles();
  const [opened, { close: closeReply, open: openReply }] = useDisclosure();
  const [editOpened, { close: closeEdit, open: openEdit }] = useDisclosure();
  const [deleteOpened, { close: closeDelete, open: openDelete }] =
    useDisclosure();

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

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.attribs) {
        if (domNode.name === "code") {
          return (
            <Prism language="javascript">
              {/* @ts-ignore */}
              {domNode.children[0]?.data ?? ""}
            </Prism>
          );
        }
      }
    },
  };

  if (isSuccess) {
    return (
      <Stack my="lg" px="xs" className={classes.text}>
        {/* Question overview */}
        <div className={classes.container}>
          {/* Question title */}
          <h2 className={classes.title}>{data.title}</h2>
          {/* Question content */}
          {parse(DOMPurify.sanitize(data.content), options)}

          <Flex justify="space-between" mt="sm">
            <Flex className={classes.text} align="start" gap={4}>
              <Avatar radius="xl" src={data.user.imageUrl} />
              <Text ml="xs">{data.user.name.full}</Text>
            </Flex>
            <Flex className={classes.text} align="center">
              <span className={classes.time}>
                {dayjs(data.createdAt).fromNow()}
              </span>
            </Flex>
          </Flex>

          <Flex gap="sm" mt="md">
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

            <QuestionActionGroup
              openReply={openReply}
              openEdit={openEdit}
              openDelete={openDelete}
              userId={data.user.id}
            />
          </Flex>

          <Accordion variant="filled" radius="lg">
            {data.answers.map((answer) => (
              <AnswerCard answerId={answer.id} />
            ))}
          </Accordion>
        </Stack>

        {/* Drawer for adding answer */}
        <AnswerFormDrawer
          questionId={data.id}
          onClose={closeReply}
          opened={opened}
        />

        <QuestionFormModal
          opened={editOpened}
          onClose={closeEdit}
          isEditing={true}
          question={{
            title: data.title,
            content: data.content,
            tags: data.tags.map((tag) => tag.name),
          }}
          questionId={data.id}
        />
        <DeleteQuestionDialog
          deleteOpened={deleteOpened}
          closeDelete={closeDelete}
          questionId={questionId}
        />
      </Stack>
    );
  } else {
    return null;
  }
};

export default QuestionDetails;
