import { Question } from "@/utils/types";
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
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
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
  question: Question;
}

const QuestionCard: React.FC<Props> = ({ question }) => {
  const { classes } = useStyles();
  return (
    <Grid className={classes.container}>
      <Grid.Col span={1}>
        <Center>
          <Avatar size="md" radius="xl" />
        </Center>
      </Grid.Col>
      <Grid.Col span={11}>
        <Stack spacing={0}>
          <Flex justify="space-between">
            <Text className={classes.username}> {question.user.fullname}</Text>
            <Text className={classes.time}>2 min ago</Text>
          </Flex>
          <Title order={4}>
            <Link to={"/questions/1"} className={classes.title}>
              {question.title}
            </Link>
          </Title>
          <p
            className={classes.text}
            dangerouslySetInnerHTML={{
              __html: question.content,
            }}
          ></p>

          <Flex sx={{ gap: 4 }}>
            {question.tags.map((tag) => (
              <Badge
                component={Link}
                to={tag.url}
                color={tag.color}
                variant="filled"
              >
                {tag.name}
              </Badge>
            ))}
          </Flex>
          <Text className={classes.text} mt={5}>
            <b>{question.answers.length}</b> answers
          </Text>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default QuestionCard;
