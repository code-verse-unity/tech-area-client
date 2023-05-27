import Error from "@/features/error/Error";
import { useAppSelector } from "@/hooks/redux";
import { selectUserId } from "@/redux/selectors/userSelector";
import { useGetUserQuestionsQuery } from "@/services/serverApi";
import { Stack } from "@mantine/core";
import QuestionCard from "./QuestionCard";

const UserQuestionList = () => {
  const userId = useAppSelector(selectUserId);

  const { data, isLoading, isError, error } = useGetUserQuestionsQuery({
    userId,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    console.log(error);
    return <Error />;
  }

  console.log("userQuestiosn", data);

  return (
    <Stack my="lg">
      {data?.map((question) => (
        <QuestionCard key={question.id} question={question} />
      ))}
    </Stack>
  );
};

export default UserQuestionList;
