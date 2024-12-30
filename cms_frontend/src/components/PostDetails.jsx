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

const PostDetails = () => {
  const fetcher = useFetcher();
  const {
    userObject: [userObject],
    errors: [errors, setErrors],
  } = useOutletContext();
  const post = useLoaderData();

  return (
    <>
      <main className={styles.mainContainer}>
        {post ? (
          <article className={styles.postDetails}>
            <section className="post-details-title">
              <h3>{post.title}</h3>
            </section>
            <section className="post-details">
              <div className="post-user">
                <small>{post.userId}</small>
              </div>
              <div className="post-createdAt">
                <small>{new DateTime(post.createdAt).toLocaleString()}</small>
              </div>
            </section>
            <section className="post-text">{parse(post.text)}</section>
            <section className="comments-section">
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
                            <small>User: {comment.user.username}</small>
                          </div>
                          <fetcher.Form method="POST">
                            <input type="hidden" name="id" value={comment.id} />
                            <div className={styles.buttonsContainer}>
                              <>
                                <Button
                                  id={comment.id}
                                  type={"submit"}
                                  text={"DELETE"}
                                ></Button>
                              </>
                            </div>
                          </fetcher.Form>
                        </section>
                      </article>
                    );
                  })}
                </>
              ) : null}
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

export const handleDelete = async ({ request, params }) => {
  const data = await request.formData();
  const { id } = params;
  const formData = Object.fromEntries(data);
  console.log(formData);
  handleFetch(
    `/posts/${id}/delete/comment/${formData.id}`,
    undefined,
    "DELETE"
  );

  return redirect(`/posts/post/${id}`);
};

export default PostDetails;
