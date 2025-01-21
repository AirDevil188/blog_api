import { useRouteError } from "react-router-dom";
import styles from "./ErrorElement.module.css";

const Error = () => {
  const error = useRouteError();

  return (
    <>
      <main className={styles.mainContainer}>
        <section className={styles.errorSection}>
          {error.message === "Posts Not Found" ? (
            <>
              <span>{error.message}</span>
              <div className={styles.errorLink}>
                <a href="/new-post">New Post</a>
              </div>
            </>
          ) : (
            <span>{error.message}</span>
          )}
        </section>
      </main>
    </>
  );
};

export default Error;
