import { QuestionFormValues } from "@/features/question/types";

export interface GetQuestionsQueryParams {
  orderDirection?: string; // asc | desc
  page?: number;
  tags?: string;
}

export interface GetQuestionTagsQueryParams {
  questionId: number;
}

export interface GetOneQuestionQueryParams {
  questionId: string;
}

export interface GetOneAnswerQueryParams {
  answerId: string;
}

export interface CreateUserTagsParams {
  userId: number;
  tags: string[];
}

export interface GetUserQuestionsParams {
  userId: number;
}

export interface CreateQuestionParams {
  body: QuestionFormValues;
}

export interface UpdateQuestionParams extends CreateQuestionParams {
  questionId: number;
}

export interface CreateAnswerParams {
  questionId: number;
  content: string;
}
