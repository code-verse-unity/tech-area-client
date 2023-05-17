import QuestionCard from "@/features/question/components/QuestionCard";
import {
  Avatar,
  Badge,
  Box,
  Flex,
  Group,
  Stack,
  Text,
  Title,
  createStyles,
} from "@mantine/core";
import { Link } from "react-router-dom";
import EditUserModal from "../components/EditUserModal";

const useStyles = createStyles((theme) => ({
  text: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    padding: theme.spacing.md,
  },
}));
interface Props {
  // Props type definition here
}

const ProfilePage: React.FC<Props> = ({}) => {
  const { classes } = useStyles();

  const tags = [
    { name: "React", color: "green", url: "/tag/react", score: 15 },
    { name: "Vue", color: "yellow", url: "/tag/vue", score: 15 },
    { name: "Typescript", color: "blue", url: "/tag/typescript", score: 15 },
  ];

  return (
    <div className={classes.text}>
      <Group py="lg">
        <Avatar size="lg" radius="xl" />
        <div>
          <Title order={2}>John Doe</Title>
          <div>exampl@gmail.com</div>
        </div>
        <Flex
          justify="end"
          sx={{
            alignSelf: "top",
            flex: 1,
          }}
        >
          <EditUserModal />
        </Flex>
      </Group>

      <Stack>
        <Title order={3}>My tags</Title>
        <Flex columnGap="sm" rowGap="xs" wrap="wrap">
          {tags.map((tag) => (
            <Badge
              component={Link}
              to={tag.url}
              color={tag.color}
              variant="filled"
              sx={{ padding: 0 }}
            >
              <Text ml={15}>
                {tag.name}
                <Badge ml={10} color="gray">
                  {tag.score}
                </Badge>
              </Text>
            </Badge>
          ))}
        </Flex>
      </Stack>

      <Stack mt="lg">
        <Title order={3}>My questions</Title>
        {[1, 4].map((i) => (
          <QuestionCard />
        ))}
      </Stack>

      <Stack mt="lg">
        <Title order={3}>My challenges</Title>
        {[1, 4].map((i) => (
          <QuestionCard />
        ))}
      </Stack>
    </div>
  );
};

export default ProfilePage;
