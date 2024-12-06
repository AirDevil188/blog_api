import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { FaUser, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "../components/Posts.module.css";

const Posts = ({ posts }) => {
  return (
    <main className={styles.mainContainer}>
      <section className={styles.titleSection}>
        <h3>Posts: </h3>
      </section>
      <section className={styles.postsSection}>
        {posts
          ? posts.map((post) => {
              return (
                <a
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
                </a>
              );
            })
          : null}
      </section>
    </main>
  );
};

export default Posts;
