import {
  redirect,
  useFetcher,
  useLoaderData,
  useOutletContext,
} from "react-router-dom";
import { DateTime } from "luxon";
import styles from "../components/PostDetails.module.css";
import parse from "html-react-parser";
import { handleFetch } from "../utils/handleFetch";
import Button from "./Button";
import { FaUser, FaCalendar, FaTags } from "react-icons/fa";
import { useRef, useState } from "react";
import DeleteModal from "./DeleteModal";

const PostDetails = () => {
  const {
    errors: [errors],
  } = useOutletContext();
  const post = useLoaderData();
  const dt = DateTime.fromISO(post.createdAt).toLocaleString();
  const commentId = useRef(null);
  const [modal, setModal] = useState(false);

  const handleModal = (e) => {
    setModal(true);
    commentId.current = e.target.id;
  };

  return (
    <>
      <main className={styles.mainContainer}>
        {post ? (
          <section className={styles.postSection}>
            <article className={styles.post}>
              <section className={styles.postInfo}>
                <div className={styles.postTitle}>
                  <h3>{post.title}</h3>
                </div>

                <div className={styles.postCreateDetails}>
                  <small>
                    <FaUser /> User:
                  </small>
                  <small> {post.user.username} </small>
                  <small>
                    <FaCalendar /> Created:
                  </small>
                  <small>{dt}</small>
                </div>
                <section className={styles.postCategories}>
                  <small>Categories: </small>
                  {post.categories.length > 0
                    ? post.categories.map((category) => {
                        return (
                          <small key={category.category.id}>
                            {category.category.title + " "}
                          </small>
                        );
                      })
                    : null}
                </section>
                <div className={styles.postDivider}></div>
              </section>
              <section className={styles.postText}>{parse(post.text)}</section>
              <section className={styles.tagsSection}>
                <small>
                  <FaTags />
                </small>
                <h3>Tags: </h3>
                {post.tags.length > 0
                  ? post.tags.map((tag) => {
                      if (tag.title !== "") {
                        return (
                          <div key={tag.title} className={styles.tag}>
                            <small>{tag.title + " "}</small>
                          </div>
                        );
                      }
                    })
                  : null}
              </section>
              <section className={styles.postCommentsSection}>
                <h3>Comments: </h3>
                {post.comments ? (
                  <>
                    {Object.values(post.comments).map((comment) => {
                      return (
                        <article
                          className={styles.comment}
                          id={comment.id}
                          key={comment.id}
                        >
                          <div className={styles.commentText}>
                            <p>{comment.text}</p>
                          </div>
                          <section className={styles.commentCreationDetails}>
                            <small>
                              <FaCalendar /> Created:
                              {new DateTime(comment.createdAt).toLocaleString()}
                            </small>
                            <small>
                              <FaUser /> User: {comment.user.username}
                            </small>
                          </section>
                          <section className={styles.commentButtonsSection}>
                            <Button
                              text="DELETE"
                              id={comment.id}
                              type="button"
                              onClick={handleModal}
                            ></Button>
                          </section>
                        </article>
                      );
                    })}
                  </>
                ) : null}
              </section>
            </article>
            {modal ? (
              <DeleteModal
                modal={modal}
                setModal={setModal}
                postId={commentId.current}
              />
            ) : null}
          </section>
        ) : null}
        {errors ? (
          <>
            <section className="errors-section">
              <p>{errors}</p>
            </section>
          </>
        ) : null}
      </main>
    </>
  );
};

export const handleDelete = async ({ request, params }) => {
  const data = await request.formData();
  const formData = Object.fromEntries(data);
  const { id } = params;

  const button = data.get("intent");

  switch (button) {
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

export default PostDetails;
