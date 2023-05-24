import { Tag } from "@/utils/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Question, QuestionsResponse, TagsResponse } from "./types";
import { ENDPOINTS } from "./endpoints";

interface GetQuestionsQueryParams {
  orderDirection?: string; // asc | desc
  page?: number;
  tags?: string;
}

interface GetQuestionTagsQueryParams {
  questionId: number;
}

export const serverApi = createApi({
  reducerPath: "serverApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8001/api/v1" }),
  tagTypes: ["Tags", "Questions"],
  endpoints: (builder) => ({
    /**
     * @description Get all tags
     */
    getTags: builder.query<Tag[], void>({
      query: () => `${ENDPOINTS.GET_TAGS}`,

      transformResponse: (response: TagsResponse) => {
        return response.data.tags;
      },
      providesTags: ["Tags"],
    }),

    /**
     * @description Get all questions
     */
    getQuestions: builder.query<Question[], GetQuestionsQueryParams>({
      query: ({ orderDirection, tags }) =>
        `${ENDPOINTS.GET_QUESTIONS}?orderDirection=${orderDirection}&${tags}`,

      transformResponse: (response: QuestionsResponse) => {
        return response.data.questions;
      },
      providesTags: ["Questions"],
    }),

    /**
     * @description Get all tags of a question
     */
    getQuestionTags: builder.query<Tag[], GetQuestionTagsQueryParams>({
      query: ({ questionId }) =>
        ENDPOINTS.GET_QUESTION_TAGS.replace(":questionId", `${questionId}`),

      transformResponse: (response: TagsResponse) => {
        return response.data.tags;
      },
    }),
  }),
});

export const {
  useGetTagsQuery,
  useGetQuestionsQuery,
  useGetQuestionTagsQuery,
} = serverApi;
