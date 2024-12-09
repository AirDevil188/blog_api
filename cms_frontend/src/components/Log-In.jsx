import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useOutletContext } from "react-router-dom";
import styles from "../components/Log-In.module.css";
import Button from "./Button";
import Form from "./Form";
import InputWrapper from "./InputWrapper";
const LogIn = () => {
  const navigate = useNavigate();
  const {
    userObject: [userObject, setUserObject],
    errors: [errors, setErrors],
  } = useOutletContext();
  useEffect(() => {
    if (userObject) {
      navigate("/");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await fetch("http://localhost:3000/cms-log-in", {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({
          username: formData.get("username"),
          password: formData.get("password"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.ok) {
        const user = {
          user: {
            token: data.token,
            username: formData.get("username"),
          },
        };
        localStorage.setItem("token", user.user.token);
        jwtDecode(localStorage.getItem("token"));
        setUserObject(user);
        console.log(userObject);
        navigate("/");
      }
      setErrors({ message: data.message });
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  return (
    <>
      <main className={styles.mainContainer}>
        <section className={styles.logInSection}>
          <Form onSubmit={handleSubmit} method={"post"}>
            <InputWrapper
              label={"Username: "}
              id={"username"}
              name={"username"}
              type={"text"}
              isRequired={true}
              className={"form-group"}
            ></InputWrapper>
            <InputWrapper
              label={"Password: "}
              id={"password"}
              name={"password"}
              type={"password"}
              isRequired={true}
              className={"form-group"}
            ></InputWrapper>
            <Button text={"Submit"} type={"submit"} />
          </Form>
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

export default LogIn;
