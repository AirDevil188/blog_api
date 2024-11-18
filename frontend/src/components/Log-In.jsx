import { useContext, useState } from "react";
import { UserContext } from "../App";
import { jwtDecode } from "jwt-decode";

const LogIn = () => {
  const { userObject, setUserObject } = useContext(UserContext);
  const [errors, setErrors] = useState(null);
  console.log(userObject);

  const handleSubmit = async (e) => {
    e.preventDefault(e);
    const formData = new FormData(e.target);
    try {
      const response = await fetch("http://localhost:3000/log-in", {
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
          },
        };
        console.log(data);
        localStorage.setItem("token", user.user.token);
        const decodedToken = jwtDecode(localStorage.getItem("token"));
        setUserObject(user);
      }
      setErrors({ message: data.message });
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  return (
    <>
      <section className="log-in-section">
        <div className="log-in-container">
          <form method="post" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username: </label>
              <input type="text" name="username" id="username" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password: </label>
              <input type="password" name="password" id="password" required />
            </div>
            <div className="button-container">
              <button type="submit">Log In</button>
            </div>
          </form>

          {errors ? (
            <>
              <section className="error-section">
                <div className="error-container">
                  <p>{errors.message}</p>
                </div>
              </section>
            </>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default LogIn;
