import {
  redirect,
  useLoaderData,
  useOutletContext,
  useNavigate,
} from "react-router-dom";
import styles from "../components/Posts.module.css";
import { DateTime } from "luxon";
import Button from "./Button";
import { handleFetch } from "../utils/handleFetch";
import { RiDraftLine } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import DeleteModal from "./DeleteModal";

const Posts = () => {
  const posts = useLoaderData();
  const [modal, setModal] = useState(false);
  const postId = useRef(null);

  const handleModal = (e) => {
    setModal(true);
    postId.current = e.target.id;
  };
  const {
    userObject: [userObject],
  } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userObject.token) {
      navigate("/log-in");
    }
  });

  return (
    <>
      <main className={styles.mainContainer}>
        <section className={styles.postsSection}>
          <section className={styles.postsHeader}>
            <span>Title</span>
            <span>Author</span>
            <span>Categories</span>
            <span>Buttons</span>
          </section>
          <section className={styles.posts}>
            {posts
              ? posts.map((post) => {
                  return (
                    <article key={post.id} id={post.id} className={styles.post}>
                      <a href={`posts/post/${post.id}`}>
                        <section className="post-title-section">
                          <h3>{post.title}</h3>
                          {!post.publish ? (
                            <>
                              <div className={styles.postDraft}>
                                <small>Draft</small>
                                <RiDraftLine />
                              </div>
                            </>
                          ) : null}
                        </section>

                        <section className={styles.postUserSection}>
                          <div>
                            <small>User: {post.user.username} </small>
                          </div>
                          <small>
                            Created At:
                            {new DateTime(post.createdAt).toLocaleString()}
                          </small>
                        </section>
                        <section className={styles.postCategoriesSection}>
                          {post.categories
                            ? post.categories.map((category) => {
                                return (
                                  <span key={category.category.id}>
                                    <>
                                      <small>{category.category.title}</small>
                                    </>
                                  </span>
                                );
                              })
                            : null}
                        </section>
                      </a>
                      <section className={styles.postButtonsSection}>
                        <input type="hidden" name="id" value={post.id} />
                        <a href={`/posts/post/update/${post.id}`}>
                          <Button
                            text={"EDIT"}
                            type={"button"}
                            value={"edit"}
                            name={"intent"}
                            id={post.id}
                          ></Button>
                        </a>
                        <Button
                          text={"DELETE"}
                          type={"button"}
                          name={"intent"}
                          id={post.id}
                          onClick={handleModal}
                        ></Button>
                      </section>
                    </article>
                  );
                })
              : null}
          </section>
        </section>

        <DeleteModal
          modal={modal}
          setModal={setModal}
          postId={postId.current}
        />
      </main>
    </>
  );
};

export const handleSubmit = async ({ request }) => {
  const data = await request.formData();
  const formData = Object.fromEntries(data);

  const button = data.get("intent");

  switch (button) {
    case "delete":
      await handleFetch(
        `/posts/post/delete/${formData.id}`,
        undefined,
        "DELETE"
      );
      break;
  }
  return redirect(`/`);
};

export default Posts;
