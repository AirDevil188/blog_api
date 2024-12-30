import {
  Link,
  redirect,
  useLoaderData,
  useOutletContext,
} from "react-router-dom";
import styles from "../components/Posts.module.css";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import Button from "./Button";
import { handleFetch } from "../utils/handleFetch";

const Posts = () => {
  const posts = useLoaderData();

  const {
    userObject: [userObject],
    errors: [errors, setErrors],
  } = useOutletContext();

  const handleDelete = async (e) => {
    try {
      const response = await fetch(
        `http://localhost:3000/posts/post/delete/${e.target.id}`,
        {
          mode: "cors",
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + userObject.token,
          },
        }
      );
      if (response.ok) {
        const data = posts.filter((post) => post.id !== e.target.id);
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  return (
    <>
      <main className={styles.mainContainer}>
        <section className={styles.titleSection}>
          <h3>Posts: </h3>
        </section>
        <section className={styles.postsSection}>
          {posts
            ? posts.map((post) => {
                return (
                  <article className={styles.post} id={post.id} key={post.id}>
                    <section className="post-title-section">
                      <h3>{post.title}</h3>
                    </section>

                    <section className="post-details-section">
                      <div>
                        <small>User: {post.user.username} </small>
                      </div>
                      <small>
                        Created At:
                        {new DateTime(post.createdAt).toLocaleString()}
                      </small>
                    </section>
                    <section className="post-buttons-section">
                      <a href={`posts/post/update/${post.id}`}>
                        <Button
                          text={"EDIT"}
                          type={"button"}
                          id={post.id}
                        ></Button>
                      </a>
                      <Button
                        text={"DELETE"}
                        type={"button"}
                        onClick={handleDelete}
                        id={post.id}
                      ></Button>
                    </section>
                  </article>
                );
              })
            : null}
        </section>
      </main>
    </>
  );
};

export const handleSubmit = async ({ request, params }) => {
  const data = await request.formData();
  const formData = Object.fromEntries(data);
  const button = data.get("intent");
  const { id } = params;
  const submission = {
    text: data.get("comment_text"),
  };

  switch (button) {
    case "submit":
      await handleFetch(`/posts/${id}/create`, submission, "POST");
      break;
    case "edit":
      await handleFetch(
        `/posts/${id}/update/comment/${formData.id}`,
        submission,
        "PUT"
      );
      break;
    case "delete":
      await handleFetch(
        `/posts/${id}/delete/comment/${formData.id}`,
        undefined,
        "DELETE"
      );
      break;
  }
  return redirect(`/posts/post/${id}`);
};

export default Posts;
