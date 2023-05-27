import { Tag, UserTag } from "@/utils/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Answer,
  AuthResponse,
  OneAnswerResponse,
  OneQuestionResponse,
  Question,
  QuestionsResponse,
  TagsResponse,
  User,
  UserTagsResponse,
  WhoAmIResponse,
} from "./types";
import { ENDPOINTS } from "./endpoints";
import {
  CreateUserTagsParams,
  GetOneAnswerQueryParams,
  GetOneQuestionQueryParams,
  GetQuestionTagsQueryParams,
  GetQuestionsQueryParams,
} from "./queryParams";
import { getToken, setToken } from "@/utils/token";
import { LoginValues, RegisterValues } from "@/features/auth/types";

export const serverApi = createApi({
  reducerPath: "serverApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8001/api/v1" }),
  tagTypes: ["Tags", "Questions", "Auth"],
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

    /**
     * @description Get Who I am
     */
    getWhoAmI: builder.query<User, void>({
      query: () => {
        return {
          url: ENDPOINTS.WHO_AM_I,
          headers: {
            authorization: "Bearer " + getToken(),
          },
        };
      },
      transformResponse: (response: WhoAmIResponse) => {
        return response.data.user;
      },
      providesTags: ["Auth"],
    }),

    /**
     * @description Registration
     */
    createUser: builder.mutation<User, RegisterValues>({
      query: (body) => {
        return {
          url: ENDPOINTS.REGISTER_LOCAL,
          method: "post",
          body,
        };
      },
      transformResponse: (response: AuthResponse) => {
        /**
         * Set the token to the localStorage
         */
        setToken(response.data.tokens.accessToken);

        return response.data.user;
      },
    }),

    /**
     * @description Create User tag
     */
    createUserTag: builder.mutation<UserTag[], CreateUserTagsParams>({
      query: ({ userId, tags }) => {
        return {
          url: ENDPOINTS.CREATE_USER_TAGS.replace(":userId", userId.toString()),
          method: "post",
          headers: {
            authorization: "Bearer " + getToken(),
          },
          body: { tags },
        };
      },
      transformResponse: (response: UserTagsResponse) => {
        return response.data.tags;
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: userTags } = await queryFulfilled;
          // console.log(userTags);

          dispatch(serverApi.util.invalidateTags(["Auth"]));
        } catch (error) {
          console.log("error in crate user tags", error);
        }
      },
    }),

    /**
     * @description Logging
     */
    logUser: builder.mutation<User, LoginValues>({
      query: (body) => {
        return {
          url: ENDPOINTS.LOGIN_LOCAL,
          method: "post",
          body,
        };
      },
      transformResponse: (response: AuthResponse) => {
        /**
         * Set the token to the localStorage
         */
        setToken(response.data.tokens.accessToken);

        return response.data.user;
      },
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  // Get
  useGetTagsQuery,
  useGetQuestionsQuery,
  useGetQuestionTagsQuery,
  useGetOneQuestionQuery,
  useGetOneAnswerQuery,
  useGetWhoAmIQuery,

  // Post
  useCreateUserMutation,
  useLogUserMutation,
  useCreateUserTagMutation,
} = serverApi;
