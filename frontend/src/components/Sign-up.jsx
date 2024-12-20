import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styles from "../components/Sign-up.module.css";

const SignUp = () => {
  const {
    userObject: [userObject, setUserObject],
    errors: [errors, setErrors],
  } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (userObject) {
      navigate("/");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await fetch("http://localhost:3000/sign-up", {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({
          username: formData.get("username"),
          password: formData.get("password"),
          confirm_password: formData.get("confirm_password"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        navigate("/");
      }
      setErrors(await response.json());
      console.log(errors);
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  return (
    <main className={styles.mainContainer}>
      <section className={styles.signUpSection}>
        <form action="POST" onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Username: </label>
            <input type="text" name="username" id="username" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" id="password" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirm_password">Confirm Password: </label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              required
            />
          </div>
          <div className="button-container">
            <button type="submit">Register</button>
          </div>
        </form>
        {errors ? (
          <>
            <section className="error-section">
              <div className="error-container">
                {errors[0].errors.map((err, index) => {
                  return <p key={index}>{err.msg}</p>;
                })}
              </div>
            </section>
          </>
        ) : null}
      </section>
    </main>
  );
};

export default SignUp;
