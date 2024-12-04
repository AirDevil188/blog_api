import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { validateJWT } from "./helper/validateJWT";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import "./index.css";

const App = () => {
  const [userObject, setUserObject] = useState("");
  const [errors, setErrors] = useState(null);
  const [hamburger, setHamburger] = useState(false);

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
      <NavBar
        user={userObject}
        setUserObject={setUserObject}
        hamburger={hamburger}
        setHamburger={setHamburger}
      />
      <Outlet
        context={{
          userObject: [userObject, setUserObject],
          errors: [errors, setErrors],
        }}
      />
      <Footer />
    </>
  );
};

export default App;
