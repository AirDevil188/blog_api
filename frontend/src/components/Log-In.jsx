import { useEffect } from "react";
import { useFetcher, useNavigate, useOutletContext } from "react-router-dom";
import styles from "../components/Log-In.module.css";
import { handleFetch } from "../utils/handleFetch";

const LogIn = () => {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  console.log(fetcher.data);

  const {
    userObject: [userObject, setUserObject],
    errors: [errors, setErrors],
  } = useOutletContext();

  useEffect(() => {
    if (userObject.token) {
      navigate("/");
    }
  }, [userObject.token]);

  useEffect(() => {
    console.log(fetcher.data);
    if (!localStorage.getItem("token")) {
      setErrors(fetcher.data);
      return;
    }
    if (fetcher.data) {
      setUserObject({
        ...userObject,
        token: fetcher.data.token,
      });
      navigate("/");
    }
  }, [fetcher.data]);

  return (
    <>
      <main className={styles.mainContainer}>
        <section className={styles.logInSection}>
          <fetcher.Form method="POST">
            <div className={styles.formGroup}>
              <label htmlFor="username">Username: </label>
              <input type="text" name="username" id="username" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Password: </label>
              <input type="password" name="password" id="password" required />
            </div>
            <div className="button-container">
              <button type="submit">Log In</button>
            </div>
          </fetcher.Form>

          {errors ? (
            <>
              <section className="error-section">
                <div className="error-container">
                  <p>{errors.message}</p>
                </div>
              </section>
            </>
          ) : null}
        </section>
      </main>
    </>
  );
};

export const handleLogIn = async ({ request }) => {
  const formData = await request.formData();
  const submission = {
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const res = await handleFetch(`/log-in`, submission, "post");
  if (res.ok) {
    const data = await res.json();
    const user = {
      user: {
        token: data.token,
        username: formData.get("username"),
      },
    };
    localStorage.setItem("token", user.user.token);
    return data;
  } else {
    return await res.json();
  }
};

export default LogIn;
