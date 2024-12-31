import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  return (
    <>
      <main>
        <section className="error-section">
          {error.message === "Posts Not Found" ? (
            <>
              <span>{error.message}</span>
              <div>
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
