import { Tag } from "@/utils/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const serverApi = createApi({
  reducerPath: "serverApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints: (builder) => ({
    getTags: builder.query<Tag[], void>({
      query: () => "/tags",
    }),
  }),
});

export const { useGetTagsQuery } = serverApi;
