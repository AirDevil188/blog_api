import { handleFetch } from "./handleFetch";

export const getPosts = async () => {
  const resp = await handleFetch("/posts", undefined, "get");
  return await resp.json();
};

export const getComments = async () => {
  const resp = await handleFetch("/comments", undefined, "get");
  return resp.json();
};

export const getPostAndComments = async ({ params }) => {
  const { id } = params;
  const resp = await handleFetch(`/posts/post/${id}`);
  return await resp.json();
};
