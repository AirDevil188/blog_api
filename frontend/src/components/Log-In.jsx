import { useEffect } from "react";
import {
  redirect,
  useFetcher,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import styles from "../components/Log-In.module.css";
import { handleFetch } from "../utils/handleFetch";

const LogIn = () => {
  const navigate = useNavigate();
  const fetcher = useFetcher();

  const {
    userObject: [userObject],
    errors: [errors, setErrors],
  } = useOutletContext();

  useEffect(() => {
    if (userObject) {
      navigate("/");
    }
  }, [userObject.token]);

  useEffect(() => {
    if (fetcher.data) {
      setErrors(fetcher.data);
    }
  });

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
  console.log(submission);
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
    return redirect("/");
  }
  return await res.json();
};

export default LogIn;
