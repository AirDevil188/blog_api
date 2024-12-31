import { redirect, useLoaderData, useFetcher } from "react-router-dom";
import styles from "../components/Posts.module.css";
import { DateTime } from "luxon";
import Button from "./Button";
import { handleFetch } from "../utils/handleFetch";

const Posts = () => {
  const posts = useLoaderData();
  const fetcher = useFetcher();

  return (
    <>
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
                    href={`posts/post/${post.id}`}
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
                    <section className="post-buttons-section">
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
      </main>
    </>
  );
};

export const handleSubmit = async ({ request }) => {
  const data = await request.formData();
  const formData = Object.fromEntries(data);

  const button = data.get("intent");
  console.log(button);

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
