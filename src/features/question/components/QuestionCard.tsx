import { QuestionWithRelation } from "@/services/types";
import {
  Avatar,
  Badge,
  Center,
  Chip,
  Flex,
  Grid,
  Group,
  Stack,
  Text,
  Title,
  createStyles,
} from "@mantine/core";
import { Link } from "react-router-dom";
import dayjs from "@/utils/dayjs";
import { useGetQuestionTagsQuery } from "@/services/serverApi";
import DOMPurify from "dompurify";
import parse, {
  Element,
  HTMLReactParserOptions,
  domToReact,
} from "html-react-parser";
import { Prism } from "@mantine/prism";

const useStyles = createStyles((theme) => ({
  container: {
    borderRadius: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
    padding: theme.spacing.sm,
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
    color: theme.colorScheme === "dark" ? "whitesmoke" : theme.black,
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
  question: QuestionWithRelation;
}

const QuestionCard: React.FC<Props> = ({ question }) => {
  const { classes } = useStyles();

  const {
    data = [],
    isLoading,
    isError,
  } = useGetQuestionTagsQuery({
    questionId: question.id,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  const sanitizedContent = () => ({
    __html: DOMPurify.sanitize(question.content),
  });

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
  return (
    <Grid className={classes.container}>
      <Grid.Col span={1}>
        <Center>
          <Avatar size="md" radius="xl" src={question.user.imageUrl} />
        </Center>
      </Grid.Col>
      <Grid.Col span={11}>
        <Stack spacing={0}>
          <Flex justify="space-between">
            <Text className={classes.username}> {question.user.name.full}</Text>
            <Text className={classes.time}>
              {dayjs(question.createdAt).fromNow()}
            </Text>
          </Flex>
          <Title order={4}>
            <Link to={`/questions/${question.id}`} className={classes.title}>
              {question.title}
            </Link>
          </Title>
          <Text lineClamp={3} mb="md" className={classes.text}>
            {parse(DOMPurify.sanitize(question.content), options)}
          </Text>

          <Flex sx={{ gap: 4 }}>
            {data.map((tag) => (
              <Badge
                component={Link}
                to={"#"}
                color={tag.bgColor}
                variant="filled"
              >
                {tag.name}
              </Badge>
            ))}
          </Flex>
          <Text className={classes.text} mt="md">
            <b>{question.answers.length}</b> answers
          </Text>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default QuestionCard;
