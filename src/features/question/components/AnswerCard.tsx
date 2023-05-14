import {
  Accordion,
  Avatar,
  Button,
  Flex,
  Text,
  createStyles,
} from "@mantine/core";
import { useColorScheme, useToggle } from "@mantine/hooks";
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

const AnswerCard: React.FC<Props> = ({}) => {
  const { classes } = useStyles();
  const [approved, toggle] = useToggle([false, true]);
  const theme = useColorScheme();
  return (
    <Accordion.Item value="a" mb="md">
      <div className={classes.container}>
        {/* Heading */}
        <Flex justify="space-between">
          <Flex align="center" gap={4}>
            <Text color="green.6" fz="md" fw="bold">
              10
            </Text>
            <b>Approvements</b>
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
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam autem
          hic similique excepturi explicabo qui ullam nobis labore, eius
          consequuntur, sequi voluptate quisquam quaerat ab. Delectus voluptas
          totam sapiente natus.
        </p>

        {/* User */}
        <Flex justify="space-between">
          <Flex className={classes.text} align="center" gap={4}>
            By
            <Link to="#">John Doe</Link>
          </Flex>
          <Flex className={classes.text} align="center" pr={4}>
            <span className={classes.time}>10 days ago</span>
          </Flex>
        </Flex>

        {/* Comments */}
        <Flex justify="space-between" mt={4}>
          <Flex align="center" gap={4}>
            <Text fz="sm" fw="bold">
              10 Comments
            </Text>
          </Flex>
          <Flex className={classes.text} align="center">
            <Accordion.Control>
              <Text fz="sm">Show comments</Text>
            </Accordion.Control>
          </Flex>
        </Flex>
      </div>

      <Accordion.Panel>Answer list</Accordion.Panel>
    </Accordion.Item>
  );
};

export default AnswerCard;
