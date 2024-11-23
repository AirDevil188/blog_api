import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useOutletContext } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();
  const [userObject, setUserObject] = useOutletContext();

  const [errors, setErrors] = useState(null);
  useEffect(() => {
    if (userObject) {
      navigate("/");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
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
