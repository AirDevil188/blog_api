import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { validateJWT } from "./helper/validateJWT";
import NavBar from "./components/Navbar";

const App = () => {
  const [userObject, setUserObject] = useState("");

  useEffect(() => {
    const token = validateJWT();
    if (token) {
      setUserObject({
        ...userObject,
        username: token.username,
        token: localStorage.getItem("token"),
      });
      console.log(userObject);
    }
  }, []);
  return (
    <>
      <NavBar user={userObject} />
      <Outlet context={[userObject, setUserObject]} />
    </>
  );
};

export default App;
