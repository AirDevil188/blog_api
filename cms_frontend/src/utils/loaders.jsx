import { handleFetch } from "./handleFetch";

export const getPosts = async () => {
  const res = await handleFetch("/posts", undefined, "GET");

  if (res.ok) {
    return await res.json();
  }

  if (res.status === 404) {
    throw new Error("Posts Not Found");
  }
};
export const getPost = async ({ params }) => {
  const { id } = params;
  const res = await handleFetch(`/posts/post/${id}`);
  if (res.ok) {
    return await res.json();
  }
  if (res.status === 404) {
    throw new Error("Post not Found");
  }
};
