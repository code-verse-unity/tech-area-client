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
import { Link } from "react-router-dom";
import AnswerCard from "../components/AnswerCard";
import { useDisclosure } from "@mantine/hooks";

interface Props {
  // Props type definition here
}

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

const QuestionDetails: React.FC<Props> = ({}) => {
  const { classes } = useStyles();
  const [opened, { close, open }] = useDisclosure();
  return (
    <Stack my="lg" className={classes.text}>
      {/* Question overview */}
      <div className={classes.container}>
        <h2 className={classes.title}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem,
          nulla ?
        </h2>
        <p className={classes.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          nulla officia, harum dolorem corrupti fuga sint perferendis velit
          assumenda amet maxime itaque debitis cupiditate, possimus labore. Iure
          ad quibusdam itaque.
        </p>
        <Flex justify="space-between">
          <Flex className={classes.text} align="center" gap={4}>
            <Avatar radius="xl" />
            <Link to="#">John Doe</Link>
          </Flex>
          <Flex className={classes.text} align="center">
            <span className={classes.time}>10 days ago</span>
          </Flex>
        </Flex>

        <Flex gap="sm" mt={10}>
          {[...Array(4).keys()].map((i) => (
            <Badge
              component={Link}
              to="/tag"
              color="green"
              variant="filled"
              sx={{ cursor: "pointer" }}
            >
              Badge
            </Badge>
          ))}
        </Flex>
      </div>

      {/* Answer list */}
      <Stack>
        <Flex justify="space-between">
          <Flex align="center" gap={4}>
            <Text color="green.6" fz="md" fw="bold">
              10
            </Text>
            Answers
          </Flex>
          <Button variant="subtle" size="xs" onClick={open}>
            Give your answer
          </Button>
        </Flex>

        <Accordion variant="filled" radius="lg">
          {[...Array(4).keys()].map((answer) => (
            <AnswerCard />
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
};

export default QuestionDetails;
