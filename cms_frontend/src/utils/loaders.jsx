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

  if (res.status === 401) {
    throw new Error("You are not authorized to access this page!");
  }
};

export const updatePost = async ({ params }) => {
  const { id } = params;
  const res = await handleFetch(`/posts/post/update/${id}`);

  if (res.ok) {
    return await res.json();
  }

  if (res.status === 404) {
    throw new Error("Post not Found");
  }
  if (res.status === 401) {
    throw new Error("You are not authorized to access this page");
  }
};

export const getCategories = async () => {
  const res = await handleFetch("/categories", undefined, "GET");

  if (res.ok) {
    return await res.json();
  }

  if (res.status === "404") {
    throw new Error("Categories not Found");
  }
};
