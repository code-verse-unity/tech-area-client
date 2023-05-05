import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
const posts = [
  { id: "1", title: "Post 1" },
  { id: "2", title: "Post 2" },
  { id: "3", title: "Post 3" },
];

const getPosts = async () => {
  return await wait(1000).then(() => [...posts]);
};

const postsQueryConfig = {
  queryKey: ["posts"],
  queryFn: getPosts,
};

const Home = () => {
  const clientQuery = useQueryClient();

  const postsQuery = useQuery(postsQueryConfig);

  const newPostMutation = useMutation({
    mutationFn: (title: string) =>
      wait(1000).then(() => posts.push({ id: crypto.randomUUID(), title })),
    onSuccess: () => clientQuery.invalidateQueries(["posts"]),
  });

  if (postsQuery.isLoading) return <h1>Loading...</h1>;

  if (postsQuery.isError) return <h1>Error...</h1>;

  return (
    <div>
      {/* @ts-ignore */}
      {postsQuery.data?.map((post) => (
        <div key={post.id}> {post.title} </div>
      ))}

      <button onClick={() => newPostMutation.mutate("New post")}>
        new post
      </button>
    </div>
  );
};

function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export default Home;
