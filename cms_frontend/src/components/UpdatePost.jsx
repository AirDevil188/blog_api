import styles from "../components/NewPost.module.css";
import { redirect, useLoaderData } from "react-router-dom";
import { handleFetch } from "../utils/handleFetch";
import PostCard from "./PostCard";

const UpdatePost = () => {
  const edit = useLoaderData();

  return (
    <>
      <section className={styles.newPostSection}>
        <PostCard edit={edit} categories={edit.allCategories} />
      </section>
    </>
  );
};

export const handleUpdateAction = async ({ request, params }) => {
  const data = await request.formData();

  const submission = {
    title: data.get("title"),
    text: data.get("text"),
    category:
      data.getAll("category").length === 0
        ? [data.get("no_category")]
        : data.getAll("category"),
    publish: JSON.parse(data.get("publish")),
  };
  const { id } = params;

  await handleFetch(`/posts/post/update/${id}`, submission, "PUT");
  return redirect(`/posts/post/${id}`);
};

export default UpdatePost;
