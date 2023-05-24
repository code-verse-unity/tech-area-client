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
import { useGetQuestionsQuery } from "@/services/serverApi";
import { useState } from "react";
import { transformTagIds } from "@/utils/tranformers";

interface Props {
  // Props type definition here
}

const QuestionsPage: React.FC<Props> = ({}) => {
  const theme = useMantineTheme();
  const [orderDirection, setorderDirection] = useState<string>("asc");
  console.log(orderDirection);

  const [page, setpage] = useState(1);
  const [tags, settags] = useState<string[]>([]);

  const {
    data = [],
    isLoading,
    isError,
  } = useGetQuestionsQuery({ orderDirection, tags: transformTagIds(tags) });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

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
          <QuestionFilter
            setorderDirection={setorderDirection}
            orderDirection={orderDirection}
            settags={settags}
          />
        </Grid.Col>
      </Grid>

      <Stack pt={theme.spacing.md}>
        {data.length === 0 ? (
          <div>No questions found</div>
        ) : (
          data.map((question) => <QuestionCard question={question} />)
        )}
      </Stack>
    </Container>
  );
};

export default QuestionsPage;
