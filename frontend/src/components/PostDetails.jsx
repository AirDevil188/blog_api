import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { DateTime } from "luxon";
import styles from "../components/PostDetails.module.css";

const PostDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const {
    userObject: [userObject, setUserObject],
    errors: [errors, setErrors],
  } = useOutletContext();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState(data ? data.comments : []);
  const [input, setInput] = useState({ newInput: "", editInput: "" });
  const [edit, setEdit] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetchPostDetails = async () => {
    setIsFetching(true);
    if (isFetching) {
      try {
        const response = await fetch(
          `http://localhost:3000/posts/post/${params.id}`,
          {
            mode: "cors",
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + userObject.token,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setData(() => ({ ...data }));
          setComments(data.comments);
        }
        setErrors(data.message);
      } catch (err) {
        console.log(err);
        return err;
      }
    }
  };

  const handleSubmit = async (e) => {
    setIsFetching(true);
    e.preventDefault();
    if (isFetching) {
      const formData = new FormData(e.target);
      try {
        const response = await fetch(
          `http://localhost:3000/posts/${params.id}/create`,
          {
            mode: "cors",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + userObject.token,
            },
            body: JSON.stringify({
              text: formData.get("comment_text"),
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setIsFetching(false);
          setInput({ ...input, newInput: "" });
          return;
        }
      } catch (err) {
        console.log(err);
        return err;
      }
    }
  };

  const handleDelete = async (e) => {
    try {
      if (isFetching) {
        const response = await fetch(
          `http://localhost:3000/posts/${params.id}/delete/comment/${e.target.id}`,
          {
            mode: "cors",
            method: "DELETE",
            headers: {
              Authorization: "Bearer " + userObject.token,
            },
          }
        );
        if (response.ok) {
          const comment = comments.filter(
            (comment) => comment.id !== e.target.id
          );

          setComments(comment);
        }
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const onShow = (e) => {
    const comment = comments.find((comment) => comment.id === e.target.id);
    setInput({ ...input, editInput: comment.text });
    setEdit(e.target.id);
  };

  const handleEdit = async (e) => {
    try {
      if (isFetching) {
        const formData = new FormData();
        formData.append("comment_text", input.editInput);
        const response = await fetch(
          `http://localhost:3000/posts/${params.id}/update/comment/${e.target.id}`,
          {
            mode: "cors",
            method: "PUT",
            body: JSON.stringify({
              text: formData.get("comment_text"),
            }),
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + userObject.token,
            },
          }
        );
        if (response.ok) {
          const newComments = [...comments];
          newComments.map((comment) => {
            if (comment.id === e.target.id) {
              comment.text = input.editInput;
            }
            return comment;
          });
          setComments(newComments);
          setInput({ ...input, editInput: "" });
          setEdit(null);
          return;
        }
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, [isFetching]);

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
                  {Object.values(comments).map((comment) => {
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
                                ></input>
                              </>
                            ) : (
                              <p>{comment.text}</p>
                            )}
                          </div>
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
                          <div className={styles.buttonsContainer}>
                            {userObject.username === comment.user.username ? (
                              <>
                                <button
                                  className="btn-delete"
                                  onClick={handleDelete}
                                  id={comment.id}
                                >
                                  DELETE
                                </button>
                                <button
                                  className="btn-edit"
                                  onClick={
                                    edit === comment.id ? handleEdit : onShow
                                  }
                                  id={comment.id}
                                >
                                  {edit === comment.id ? "SUBMIT" : "EDIT"}
                                </button>
                              </>
                            ) : null}
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
                <form method="POST" onSubmit={handleSubmit}>
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
                    />
                  </div>
                  <div className="button-container">
                    <button type="submit">Submit</button>
                  </div>
                </form>
              </section>
            </section>
          </article>
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

export default PostDetails;
