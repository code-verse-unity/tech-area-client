import { Tag } from "@/utils/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Question, QuestionsResponse, TagsResponse } from "./types";
import { ENDPOINTS } from "./endpoints";

export const serverApi = createApi({
  reducerPath: "serverApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8001/api/v1" }),
  endpoints: (builder) => ({
    /**
     * @description Get all tags
     */
    getTags: builder.query<TagsResponse, void>({
      query: () => "/tags",
    }),

    /**
     * @description Get all questions
     */
    getQuestions: builder.query<Question[], void>({
      query: () => ENDPOINTS.GET_QUESTIONS,
      transformResponse: (response: QuestionsResponse) => {
        return response.data.questions;
      },
    }),
  }),
});

export const { useGetTagsQuery, useGetQuestionsQuery } = serverApi;
