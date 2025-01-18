import { useEffect, useState } from "react";
import {
  redirect,
  useFetcher,
  useLoaderData,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { DateTime } from "luxon";
import styles from "../components/PostDetails.module.css";
import Button from "./Button";
import { handleFetch } from "../utils/handleFetch";
import DeleteModal from "./DeleteModal";
import parse from "html-react-parser";
import { FaUser, FaCalendar, FaTags } from "react-icons/fa";
import { useRef } from "react";

const PostDetails = () => {
  const fetcher = useFetcher();
  const data = useLoaderData();
  console.log(data);
  const {
    userObject: [userObject],
  } = useOutletContext();

  const [input, setInput] = useState({ newInput: "", editInput: "" });
  const [edit, setEdit] = useState(null);
  const [modal, setModal] = useState(false);
  const commentId = useRef(null);

  const onShow = (e) => {
    const comment = data.comments.find((comment) => comment.id === e.target.id);
    setInput({ ...input, editInput: comment.text });
    setEdit(e.target.id);
  };

  const handleModal = (e) => {
    setModal(true);
    commentId.current = e.target.id;
  };

  const dt = DateTime.fromISO(data.createdAt).toLocaleString();

  useEffect(() => {
    if (fetcher.state === "idle") {
      setInput({ ...input, newInput: "" });
    }
  }, [fetcher.state]);

  return (
    <>
      <main className={styles.mainContainer}>
        {data ? (
          <section className={styles.postSection}>
            <article className={styles.post}>
              <section className={styles.postInfo}>
                <div className={styles.postTitle}>
                  <h3>{data.title}</h3>
                </div>

                <section className={styles.postCreateDetails}>
                  <small>
                    <FaUser /> User:
                  </small>
                  <small> {data.user.username} </small>
                  <small>
                    <FaCalendar /> Created:
                  </small>
                  <small>{dt}</small>
                </section>
                <section className={styles.postCategories}>
                  <small>Categories: </small>
                  {data.categories.length > 0
                    ? data.categories.map((category) => {
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

              <section className={styles.postText}>{parse(data.text)}</section>
              <div className={styles.postDivider}></div>
              <section className={styles.tagsSection}>
                <small>
                  <FaTags />
                </small>
                <h3>Tags: </h3>
                {data.tags.length > 0
                  ? data.tags.map((tag) => {
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
              <section className={styles.commentsSection}>
                {data.comments ? (
                  <>
                    {Object.values(data.comments).map((comment) => {
                      return (
                        <article
                          className={styles.comment}
                          id={comment.id}
                          key={comment.id}
                        >
                          <h3>Comments: </h3>
                          <section className={styles.commentTextSection}>
                            {edit === comment.id ? (
                              <>
                                <>
                                  <fetcher.Form
                                    method="POST"
                                    onSubmit={() => setEdit(null)}
                                  >
                                    <input
                                      type="hidden"
                                      name="id"
                                      value={comment.id}
                                    />
                                    <textarea
                                      id="comment_text"
                                      name="comment_text"
                                      value={input.editInput}
                                      placeholder="Write a comment..."
                                      onChange={(e) =>
                                        setInput({
                                          ...input,
                                          editInput: e.target.value,
                                        })
                                      }
                                      required={true}
                                    ></textarea>
                                    <div className="buttons-container">
                                      <Button
                                        text="Submit"
                                        type="submit"
                                        name={"intent"}
                                        value={"edit"}
                                        id={comment.id}
                                      ></Button>
                                    </div>
                                  </fetcher.Form>
                                </>
                              </>
                            ) : (
                              <>
                                <div className={styles.commentText}>
                                  <p>{comment.text}</p>
                                </div>
                                <div className={styles.commentCreationDetails}>
                                  <small>
                                    <FaCalendar /> Created:
                                    {new DateTime(
                                      comment.createdAt
                                    ).toLocaleString()}
                                  </small>
                                  <small>
                                    <FaUser /> User: {comment.user.username}
                                  </small>
                                </div>
                              </>
                            )}

                            {userObject.username === comment.user.username ? (
                              <>
                                <div className={styles.commentButtonContainer}>
                                  {!edit ? (
                                    <>
                                      <Button
                                        text={"EDIT"}
                                        type="button"
                                        id={comment.id}
                                        onClick={onShow}
                                      ></Button>
                                      <Button
                                        type="button"
                                        text="DELETE"
                                        id={comment.id}
                                        onClick={handleModal}
                                      ></Button>
                                    </>
                                  ) : null}
                                </div>
                              </>
                            ) : null}
                          </section>
                          <section className="comment-details"></section>
                        </article>
                      );
                    })}
                  </>
                ) : null}

                <section className={styles.createCommentSection}>
                  <section className={styles.postCommentTitle}>
                    <h3>Post Comment: </h3>
                  </section>
                  <fetcher.Form method="POST">
                    <div className="form-group">
                      <label htmlFor="comment_text"></label>
                      <textarea
                        type="text"
                        id="comment_text"
                        name="comment_text"
                        placeholder="Write a comment..."
                        value={input.newInput}
                        onChange={(e) =>
                          setInput({ ...input, newInput: e.target.value })
                        }
                        required={true}
                      />
                    </div>
                    <Button
                      text="Submit"
                      type="submit"
                      name={"intent"}
                      value={"submit"}
                    />
                  </fetcher.Form>
                </section>
              </section>
            </article>
            {modal ? (
              <>
                <DeleteModal
                  commentId={commentId.current}
                  modal={modal}
                  setModal={setModal}
                />
              </>
            ) : null}
          </section>
        ) : null}
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

export default PostDetails;
