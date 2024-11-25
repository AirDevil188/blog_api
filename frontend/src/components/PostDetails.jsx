import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { DateTime } from "luxon";

const PostDetails = () => {
  const params = useParams();
  const {
    userObject: [userObject, setUserObject],
    errors: [errors, setErrors],
  } = useOutletContext();
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [reload, setReload] = useState(false);
  const [input, setInput] = useState("");

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
        }
        setErrors(data.message);
      } catch (err) {
        console.log(err);
        return err;
      }
    }
  };

  const handleSubmit = async (e) => {
    setReload(false);
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
        await response.json();
        if (response.ok) {
          setReload(true);
          setInput("");
          return;
        }
      } catch (err) {
        console.log(err);
        return err;
      }
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, [isFetching, reload]);

  return (
    <>
      {data ? (
        <article className="post-details">
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
                {data.comments.map((comment) => {
                  return (
                    <article
                      className="comment"
                      id={comment.id}
                      key={comment.id}
                    >
                      <section className="comment-text">
                        <div className="comment-text">
                          <p>{comment.text}</p>
                        </div>
                      </section>
                      <section className="comment-details">
                        <div className="comment-createdAt">
                          <small>
                            {new DateTime(comment.createdAt).toLocaleString()}
                          </small>
                        </div>
                        <div className="comment-user">
                          <small>{comment.user.username}</small>
                        </div>
                      </section>
                    </article>
                  );
                })}
              </>
            ) : null}
            <section className="create-comment-section">
              <form method="POST" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="comment_text"></label>
                  <input
                    type="text"
                    id="comment_text"
                    name="comment_text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
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
    </>
  );
};

export default PostDetails;
