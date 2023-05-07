import {
  Box,
  Button,
  Container,
  Stack,
  Title,
  useMantineTheme,
} from "@mantine/core";
import QuestionCard from "../components/QuestionCard";

const HomePage = () => {
  const theme = useMantineTheme();
  return (
    <Container my="md">
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Title order={3}>Questions for you</Title>
      </Box>
      <Stack pt={theme.spacing.md}>
        {[1, 2, 3, 4].map((i) => (
          <QuestionCard />
        ))}
      </Stack>
    </Container>
  );
};

export default HomePage;
