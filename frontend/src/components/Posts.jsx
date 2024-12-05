import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { FaUser, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Posts = ({ posts }) => {
  return (
    <main>
      <section className="posts-section">
        {posts
          ? posts.map((post) => {
              return (
                <article className="post" id={post.id} key={post.id}>
                  <section className="post-title-section">
                    <h3>{post.title}</h3>
                  </section>
                  <section className="post-text-section">
                    <p>{post.text}</p>
                  </section>
                  <section className="post-details-section">
                    <FaUser />
                    <small>User: {post.user.username}</small>
                    <small>
                      <FaCalendarAlt />
                      Created At:
                      {new DateTime(post.createdAt).toLocaleString()}
                    </small>
                  </section>
                </article>
              );
            })
          : null}
      </section>
    </main>
  );
};

export default Posts;
