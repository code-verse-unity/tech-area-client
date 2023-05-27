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
