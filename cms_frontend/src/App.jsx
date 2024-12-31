import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { validateJWT } from "./helper/validateJWT";

const App = () => {
  const [userObject, setUserObject] = useState({ token: null, username: null });
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const token = validateJWT();
    if (token) {
      setUserObject({
        ...userObject,
        username: token.username,
        token: localStorage.getItem("token"),
      });
    }
  }, [userObject.token]);

  return (
    <>
      <Outlet
        context={{
          userObject: [userObject, setUserObject],
          errors: [errors, setErrors],
        }}
      />
    </>
  );
};

export default App;
