import styles from "../components/NewPost.module.css";
import PostCard from "./PostCard";
import { redirect, useLoaderData } from "react-router-dom";
import { handleFetch } from "../utils/handleFetch";

const NewPost = () => {
  const categories = useLoaderData();
  return (
    <>
      <main>
        <section className={styles.newPostSection}>
          <PostCard categories={categories} />
        </section>
      </main>
    </>
  );
};

export const handleAction = async ({ request, params }) => {
  const data = await request.formData();
  const submission = {
    title: data.get("title"),
    tags: data.getAll("tags"),
    text: data.get("text"),
    category:
      data.getAll("category").length === 0
        ? [data.get("no_category")]
        : data.getAll("category"),
    publish: JSON.parse(data.get("publish")),
  };
  const { id } = params;

  switch (id) {
    case undefined:
      await handleFetch(`/posts/create-post`, submission, "POST");
      return redirect(`/`);
  }
};

export default NewPost;
