import { createContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { validateJWT } from "./helper/validateJWT";

export const UserContext = createContext(null);

const App = () => {
  const [userObject, setUserObject] = useState({ username: "", token: "" });

  useEffect(() => {
    const token = validateJWT();
    if (token) {
      setUserObject({
        ...userObject,
        username: token.username,
        token: localStorage.getItem("token"),
      });
    }
  }, []);
  return (
    <>
      <UserContext.Provider value={{ userObject, setUserObject }}>
        <Outlet />
      </UserContext.Provider>
    </>
  );
};

export default App;
