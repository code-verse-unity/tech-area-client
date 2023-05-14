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
  // Props type definition here
}

const QuestionCard: React.FC<Props> = ({}) => {
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
            <Text className={classes.username}>User name</Text>
            <Text className={classes.time}>2 min ago</Text>
          </Flex>
          <Title order={4}>
            <Link to={"/questions/1"} className={classes.title}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit,{" "}
            </Link>
          </Title>
          <p className={classes.text}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
            reiciendis nobis quod fugit maiores, sequi hic doloremque natus
            repellendus molestiae inventore, rerum eius, alias aspernatur
            necessitatibus possimus quam perspiciatis eos.
          </p>

          <Flex sx={{ gap: 4 }}>
            <Badge component="a" href="/tag" color="green" variant="filled">
              Badge
            </Badge>
            <Badge color="yellow" variant="filled">
              Badge
            </Badge>
            <Badge color="red" variant="filled">
              Badge
            </Badge>
            <Badge color="blue" variant="filled">
              Badge
            </Badge>
          </Flex>
          <Text className={classes.text} mt={5}>
            <b>4</b> answers
          </Text>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default QuestionCard;
