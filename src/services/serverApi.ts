import { Tag } from "@/utils/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Answer,
  OneAnswerResponse,
  OneQuestionResponse,
  Question,
  QuestionsResponse,
  TagsResponse,
} from "./types";
import { ENDPOINTS } from "./endpoints";
import {
  GetOneAnswerQueryParams,
  GetOneQuestionQueryParams,
  GetQuestionTagsQueryParams,
  GetQuestionsQueryParams,
} from "./queryParams";

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

    /**
     * @description Get One Question
     */
    // TODO: invalidate this when new answers or new comments or new votes
    getOneQuestion: builder.query<Question, GetOneQuestionQueryParams>({
      query: ({ questionId }) =>
        ENDPOINTS.GET_ONE_QUESTION.replace(":questionId", `${questionId}`),

      transformResponse: (response: OneQuestionResponse) => {
        return response.data.question;
      },
    }),

    /**
     * @description Get One Answer
     */
    getOneAnswer: builder.query<Answer, GetOneAnswerQueryParams>({
      query: ({ answerId }) =>
        ENDPOINTS.GET_ONE_ANSWER.replace(":answerId", `${answerId}`),

      transformResponse: (response: OneAnswerResponse) => {
        return response.data.answer;
      },
    }),
  }),
});

export const {
  useGetTagsQuery,
  useGetQuestionsQuery,
  useGetQuestionTagsQuery,
  useGetOneQuestionQuery,
  useGetOneAnswerQuery,
} = serverApi;
