import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Title,
  useMantineTheme,
} from "@mantine/core";
import QuestionCard from "../components/QuestionCard";
import QuestionFilter from "@/features/question/components/QuestionFilter";

interface Props {
  // Props type definition here
}

const QuestionsPage: React.FC<Props> = ({}) => {
  const theme = useMantineTheme();
  return (
    <Container my="md">
      <Grid>
        <Grid.Col span={11}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              color: theme.colorScheme === "dark" ? "white" : theme.colors.dark,
            }}
          >
            <Title order={3}>Questions</Title>
          </Box>
        </Grid.Col>
        <Grid.Col span={1}>
          <QuestionFilter />
        </Grid.Col>
      </Grid>

      <Stack pt={theme.spacing.md}>
        {[1, 4].map((i) => (
          <QuestionCard />
        ))}
      </Stack>
    </Container>
  );
};

export default QuestionsPage;
