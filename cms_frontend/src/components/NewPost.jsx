import styles from "../components/NewPost.module.css";
import NewPostCard from "./NewPostForm";
import { redirect, useLoaderData } from "react-router-dom";
import { handleFetch } from "../utils/handleFetch";

const NewPost = () => {
  const edit = useLoaderData();

  return (
    <>
      <section className={styles.newPostSection}>
        <NewPostCard edit={edit} />
      </section>
    </>
  );
};

export const handleAction = async ({ request, params }) => {
  const data = await request.formData();
  const submission = {
    title: data.get("title"),
    text: data.get("text"),
  };
  const { id } = params;

  switch (id) {
    case undefined:
      await handleFetch(`/posts/create-post`, submission, "POST");
      return redirect(`/`);

    default:
      await handleFetch(`/posts/post/update/${id}`, submission, "PUT");
      return redirect(`/posts/post/${id}`);
  }
};

export default NewPost;
