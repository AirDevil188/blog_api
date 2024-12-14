import { useOutletContext } from "react-router-dom";
import styles from "../components/Posts.module.css";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import Button from "./Button";

const Posts = () => {
  const [posts, setPosts] = useState(null);

  const {
    userObject: [userObject],
    errors: [errors, setErrors],
  } = useOutletContext();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("http://localhost:3000/posts", {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userObject.token,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
      setErrors(errors);
    };
    fetchPosts();
  });

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

        setPosts(data);
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
                  <article
                    className={styles.post}
                    id={post.id}
                    key={post.id}
                    href={`/posts/post/${post.id}`}
                  >
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
                      <a href={`post/update/${post.id}`}>
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

export default Posts;
