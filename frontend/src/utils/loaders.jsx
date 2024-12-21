import { handleFetch } from "./handleFetch";

export const getPosts = async () => {
  const res = await handleFetch("/posts", undefined, "get");

  if (res.ok) {
    return await res.json();
  }

  if (res.status === 404) {
    throw new Error("Posts Not Found!");
  }
};

export const getComments = async () => {
  const res = await handleFetch("/comments", undefined, "get");

  if (res.ok) {
    return res.json();
  }

  if (res.status === 404) {
    throw new Error("Comments not Found!");
  }
};

export const getPostAndComments = async ({ params }) => {
  const { id } = params;
  const res = await handleFetch(`/posts/post/${id}`);
  if (res.ok) {
    return await res.json();
  }

  if (res.status === 404) {
    throw new Error("Post Not Found!");
  }

  if (res.status === 401) {
    throw new Error("You are not authorized to access this page!");
  }
};
