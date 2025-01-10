import {
  redirect,
  useLoaderData,
  useFetcher,
  useOutletContext,
  useNavigate,
} from "react-router-dom";
import styles from "../components/Posts.module.css";
import { DateTime } from "luxon";
import Button from "./Button";
import { handleFetch } from "../utils/handleFetch";
import { RiDraftLine } from "react-icons/ri";
import { useEffect } from "react";

const Posts = () => {
  const posts = useLoaderData();
  const fetcher = useFetcher();
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
            <span></span>
          </section>
          <section className={styles.posts}>
            {posts
              ? posts.map((post) => {
                  return (
                    <a
                      className={styles.post}
                      id={post.id}
                      key={post.id}
                      href={`posts/post/${post.id}`}
                    >
                      <section className="post-title-section">
                        <h3>{post.title}</h3>
                        {!post.publish ? (
                          <>
                            <div className="post-draft">
                              <small>Draft</small>
                              <RiDraftLine />
                            </div>
                          </>
                        ) : null}
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
                      <section className={styles.postButtonsSection}>
                        <fetcher.Form method="POST">
                          <input type="hidden" name="id" value={post.id} />

                          <Button
                            text={"EDIT"}
                            type={"submit"}
                            value={"edit"}
                            name={"intent"}
                            id={post.id}
                          ></Button>
                          <Button
                            text={"DELETE"}
                            type={"submit"}
                            value={"delete"}
                            name={"intent"}
                            id={post.id}
                          ></Button>
                        </fetcher.Form>
                      </section>
                    </a>
                  );
                })
              : null}
          </section>
        </section>
      </main>
    </>
  );
};

export const handleSubmit = async ({ request }) => {
  const data = await request.formData();
  const formData = Object.fromEntries(data);

  const button = data.get("intent");

  switch (button) {
    case "edit":
      return redirect(`posts/post/update/${formData.id}`);

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
