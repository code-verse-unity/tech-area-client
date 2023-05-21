import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Title,
  useMantineTheme,
} from "@mantine/core";
import QuestionCard from "../components/QuestionCard";

const HomePage = () => {
  const theme = useMantineTheme();
  return (
    <Container my="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: theme.colorScheme === "dark" ? "white" : theme.colors.dark,
        }}
      >
        <Title order={3}>Your questions</Title>
        <div>Question that you have asked to the community.</div>
      </Box>
      <Stack pt={theme.spacing.md}>
        {/* {[1, 4].map((i) => (
          <QuestionCard />
        ))} */}
      </Stack>

      <Divider my={15} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: theme.colorScheme === "dark" ? "white" : theme.colors.dark,
        }}
      >
        <Title order={3}>Questions for you</Title>
        <div>Suggestion based on your preferences.</div>
      </Box>
      <Stack pt={theme.spacing.md}>
        {/* {[1, 2, 3, 4].map((i) => (
          <QuestionCard />
        ))} */}
      </Stack>
    </Container>
  );
};

export default HomePage;
