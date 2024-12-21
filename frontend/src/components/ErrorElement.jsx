import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  return (
    <>
      <main>
        <section className="error-section">
          <p>{error.message}</p>
        </section>
      </main>
    </>
  );
};

export default Error;
