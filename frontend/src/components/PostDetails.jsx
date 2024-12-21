import { useEffect, useState } from "react";
import {
  redirect,
  useFetcher,
  useLoaderData,
  useOutletContext,
} from "react-router-dom";
import { DateTime } from "luxon";
import styles from "../components/PostDetails.module.css";
import Button from "./Button";
import { handleFetch } from "../utils/handleFetch";
import FormModal from "./FormModal";

const PostDetails = () => {
  const fetcher = useFetcher();
  const data = useLoaderData();
  const {
    userObject: [userObject],
  } = useOutletContext();

  const [input, setInput] = useState({ newInput: "", editInput: "" });
  const [edit, setEdit] = useState(null);
  const [deleteBtn, setDeleteBtn] = useState(null);

  const onShow = (e) => {
    const comment = data.comments.find((comment) => comment.id === e.target.id);
    setInput({ ...input, editInput: comment.text });
    setEdit(e.target.id);
  };

  useEffect(() => {
    if (fetcher.state === "idle") {
      setInput({ ...input, newInput: "" });
    }
  }, [fetcher.state]);

  return (
    <>
      <main className={styles.mainContainer}>
        {data ? (
          <article className={styles.postDetails}>
            <section className="post-details-title">
              <h3>{data.title}</h3>
            </section>
            <section className="post-details">
              <div className="post-user">
                <small>{data.userId}</small>
              </div>
              <div className="post-createdAt">
                <small>{new DateTime(data.createdAt).toLocaleString()}</small>
              </div>
            </section>
            <section className="post-text">
              <p>{data.text}</p>
            </section>
            <section className="comments-section">
              <h3>Comments: </h3>
              {data.comments ? (
                <>
                  {Object.values(data.comments).map((comment) => {
                    return (
                      <article
                        className={styles.comment}
                        id={comment.id}
                        key={comment.id}
                      >
                        <section className="comment-text">
                          <div className="comment-text">
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
                                    <input
                                      id="comment_text"
                                      name="comment_text"
                                      value={input.editInput}
                                      onChange={(e) =>
                                        setInput({
                                          ...input,
                                          editInput: e.target.value,
                                        })
                                      }
                                      required={true}
                                    ></input>
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
                              <p>{comment.text}</p>
                            )}
                          </div>
                          {userObject.username === comment.user.username ? (
                            <>
                              <div className="buttons-container">
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
                                      onClick={(e) => setDeleteBtn(e.target.id)}
                                    ></Button>
                                  </>
                                ) : null}
                              </div>
                            </>
                          ) : null}
                        </section>
                        <section className="comment-details">
                          <div className="comment-createdAt">
                            <small>
                              {new DateTime(comment.createdAt).toLocaleString()}
                            </small>
                          </div>
                          <div className="comment-user">
                            <small>User: {comment.user.username}</small>
                          </div>
                        </section>
                      </article>
                    );
                  })}
                </>
              ) : null}
              <section className="create-comment-section">
                <section className={styles.postCommentTitle}>
                  <h3>Post Comment: </h3>
                </section>
                <fetcher.Form method="POST">
                  <div className="form-group">
                    <label htmlFor="comment_text"></label>
                    <input
                      type="text"
                      id="comment_text"
                      name="comment_text"
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
            {deleteBtn ? (
              <>
                <FormModal commentId={deleteBtn} />
              </>
            ) : null}
          </article>
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
