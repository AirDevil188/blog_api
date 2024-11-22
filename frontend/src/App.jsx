import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { validateJWT } from "./helper/validateJWT";
import NavBar from "./components/Navbar";

export const UserContext = createContext(null);

const App = () => {
  const [userObject, setUserObject] = useState(null);

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
      <NavBar />
      <UserContext.Provider value={{ userObject, setUserObject }}>
        <Outlet />
      </UserContext.Provider>
    </>
  );
};

export default App;
