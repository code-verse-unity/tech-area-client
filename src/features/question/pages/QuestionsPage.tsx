import {
  Box,
  Container,
  Divider,
  Grid,
  Pagination,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import QuestionCard from "../components/QuestionCard";
import QuestionFilter from "@/features/question/components/QuestionFilter";
import { useGetQuestionsQuery } from "@/services/serverApi";
import { useEffect, useState } from "react";
import { transformTagIds } from "@/utils/tranformers";
import { useAuth } from "@/features/auth";
import Error from "@/features/error/Error";

interface Props {
  // Props type definition here
}

const QuestionsPage: React.FC<Props> = ({}) => {
  const theme = useMantineTheme();
  const [orderDirection, setorderDirection] = useState<string>("desc");

  const [page, setpage] = useState(1);
  const [tags, settags] = useState<string[]>([]);

  const { data, isLoading, isError } = useGetQuestionsQuery({
    orderDirection,
    tags: transformTagIds(tags),
    page,
  });

  useEffect(() => {
    /**
     * Scroll to the top every time page change
     */
    window.scrollTo({ top: 0 });
  }, [page]);

  if (isLoading) {
    return <div>Loading in question page...</div>;
  }

  if (isError) {
    return <Error />;
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
            <div>
              <Text fz="md" fw="bold" color="green" component="span">
                {data?.totalItems}
              </Text>{" "}
              results
            </div>
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
        {data?.questions.length === 0 ? (
          <div>No questions found</div>
        ) : (
          data?.questions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))
        )}
      </Stack>

      <Box py={10}>
        <Pagination
          total={data?.totalPage ?? 0}
          value={page}
          onChange={setpage}
          color="green"
        />
      </Box>
    </Container>
  );
};

export default QuestionsPage;
